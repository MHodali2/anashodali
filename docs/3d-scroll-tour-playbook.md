# Scroll-driven 3D architectural tour — build playbook

How `3d-tour-test.html` (the Bireh Plaza walkthrough) is built, so it can be
repeated for another project / model. There are **two workflows**:

| | when | model source | tools |
|---|---|---|---|
| **A — Textured model (recommended)** | you still have the original authoring file (3ds Max etc.) | textured `.glb` exported straight from it | Node `gltf-transform`, Blender only for preview renders |
| **B — Raw CAD `.blend` (legacy)** | all you have is a CAD import in Blender | flat-colour materials, thousands of loose objects | headless Blender scripts |

Workflow A is what the current page uses (`plaza-textured.glb`). Workflow B is
the original prototype and is kept below because its scroll/camera/page phases
(3–5) are shared by both.

- **Output (both):** one standalone HTML page + a few derived assets. No
  bundler, no framework, no changes to any other page.
- **Approach:** phases, each ending with a preview + a check-in.

---

# Workflow A — textured GLB from 3ds Max (recommended)

## A0. Why textures were lost the first time

The first prototype went CAD → Blender → GLB. The Blender file had **zero image
textures** (see B/1a), so nothing downstream could recover them. **Textures must
be exported from the original authoring app.** Blender cannot bring back what
the CAD import already dropped. Always check first: does the source `.blend`
/ GLB actually contain images?

## A1. Prepare and export from 3ds Max

- **Material type decides everything.** V-Ray / Corona / Arnold materials do
  **not** export to glTF/FBX (you get flat grey or black). Use **Physical** or
  **Standard** materials with real bitmaps, or use the exporter's **Baked
  materials** option, which bakes renderer materials to PBR maps.
- Exporter options seen in 3ds Max's glTF exporter: **Original materials**
  (exports your Physical/Standard shaders + bitmaps as-is; sharp, no bake
  artefacts) vs **Baked materials** (handles renderer materials; slower; can
  produce black or lighting-baked maps). Try Original first when the scene uses
  Physical/Standard bitmaps; fall back to Baked otherwise.
- **`.glb` embeds textures automatically** — there is no "embed textures"
  toggle because none is needed (only `.gltf` writes separate files).
- The exporter also writes a **`.txt` log** next to the GLB. It is not part of
  the model but lists unsupported-material / missing-bitmap warnings — read it.
- Before export: set units to metres; run **Asset Tracking / Resource
  Collector** so bitmap paths resolve; give objects meaningful names and put
  them on layers (`Shell`, `Interior`, `Roof`, `Glass`…); delete site-survey
  junk, cameras, lights; Reset XForm / collapse heavy modifier stacks; make sure
  textured objects have UVs.
- Standard → Physical: click the material type button in the Material Editor,
  pick **Physical Material**, discard the old material, re-plug the bitmap into
  **Base Color**, set Metalness 0 for non-metals. V-Ray/Corona/Arnold → Physical
  is manual (no automatic conversion).
- **Test the export before doing anything else**: drag the GLB into
  `gltf-viewer.donmccurdy.com`.
  - Flat black under *Linear* tone mapping and purple under *ACES* = base colours
    near zero / metallic 1 with no textures (unconverted materials).
  - Wireframe fine + dark shading = a material problem, not geometry.
- The source GLB can be huge (this one was **198 MB**: 11 textures totalling
  108 MB, one **6000×6000**, 1.81 M triangles, 7,403 meshes). That is fine as a
  *source*, not as the delivered file. **Do not commit it** (GitHub rejects
  files > 100 MB) — add it to `.gitignore` and move it between machines
  by AirDrop/drive.

## A2. Inspect (never optimise blind)

`docs/gltf-pipeline/summ.mjs` (Node, `@gltf-transform/core`) prints: node / mesh
/ primitive counts, total triangles, material count, texture list with size and
byte weight, per-material base colour / metallic / roughness / transmission,
UV coverage, and node-name prefixes. Things to look for:

- **Textures present?** How many, what resolution, which are enormous and used
  by only a few meshes (here a 6000² map was used by 3 meshes).
- **`fallback Material` with metallic 1 / roughness 1** — the exporter's default
  for anything it couldn't convert. It renders **black** (nothing to reflect).
  Reset it (see A3).
- **`KHR_materials_transmission`** glass — see A5.
- **Bounding box vs. the old model.** A different origin/orientation/scale
  invalidates the camera path. Find a landmark (here the revolving-door nodes,
  `docs/gltf-pipeline/door.mjs`) and compare its size and height to the old one.
  If it doesn't match, treat it as a new model and re-author the path (A4).

## A3. Optimise with `gltf-transform` — no Blender needed

`docs/gltf-pipeline/opt.mjs`:

```
node opt.mjs <source.glb> <out.glb> [simplifyRatio=0.4]
```

Deps: `npm i @gltf-transform/core @gltf-transform/extensions
@gltf-transform/functions meshoptimizer draco3dgltf sharp`.

Order matters:
1. remove junk nodes (name regex — **model-specific**), reset
   `fallback Material` to a neutral non-metal (metallic 0, roughness ~0.85).
   **Never delete by name prefix without checking what the nodes are.** Here
   `Obj_Polyline_*` (8 flat zero-height sheets) really was junk, but `Line###`
   (39 nodes) looked like survey lines and were actually the **tower floor
   slabs, textured paving, the 64 m core, rail glass and kerbs**. Run
   `lines.mjs` (prints each candidate's tris, material, world bbox) first;
   textured materials, big bboxes and non-zero heights mean real geometry;
2. `prune` → `flatten` → `dedup`;
3. **`join` by material** (7,403 meshes → 34; this is the draw-call win) →
   `weld`;
4. **`simplify`** (meshoptimizer, ratio 0.5, `error 0.0005`, `lockBorder`) —
   **only on untextured, opaque meshes** (railings, structure). **Glass and
   UV-textured meshes are protected**: collapsing them warps flat facade grids
   and smears tile textures. `simplify()` has no filter, so protected
   primitives are flipped to draw mode `LINES` for the call (it skips
   unsupported modes; do **not** use `POINTS`, which has its own code path and
   asserts) and restored afterwards. 1.8 M → ~977 k triangles;
   4b. **flat normals for the curtain wall**: exporters smooth normals across
   panel corners (~10 % of vertices >10° off the panel plane), which smears
   reflections along panel edges. `flatShade()` un-indexes that primitive and
   writes true face normals (`normals.mjs` prints the deviation per material);
5. **`textureCompress`** with `sharp`: **WebP**, resize to ≤ 2048, quality 82
   (108 MB of textures → 5.7 MB);
6. `prune` → **`draco`** (edgebreaker, position 14 / normal 10 / texcoord 12);
7. **`center({ pivot: 'below' })`** — centres x/z on the bbox with the lowest
   point at y=0. Scene space then equals meta space (`modelOffset ≈ 0`), so
   coordinates in the meta/path files are the coordinates you see.

Result here: **198 MB → 8.0 MB, 7,407 → 34 draw calls, 1.81 M → 977 k
triangles, 93 → 33 materials, ~5 seconds.** (The first version was 7.6 MB /
755 k triangles but was wrong: it had deleted the slabs and over-simplified the
facade — see the checks in A3b.)

### A3b. Compare against the source before trusting the output

Render the **same camera** on the source GLB and the optimised GLB in Blender
(`compare.py`: import both; the optimised one is centred, the source is not, so
add the centring offset to the source camera), then view them side by side.
Also render **after each stage** (flatten → join → weld → simplify) to find
which one changed the picture. This is how the deleted slabs, the warped grid
and the lost tile texture were found — by *looking*, after hours of assuming the
sky/glass settings were at fault. Bounding boxes agreeing does **not** mean the
content agrees. Also re-measure after any change to what's kept: **`center` puts
the lowest remaining point at y=0, so deleting/restoring low geometry shifts
every height** (restoring the slabs' foundation level moved everything up
3.3 m and the camera path had to be shifted to match).

- **WebP, not KTX2.** `toktx` wasn't installed and WebP is enough at this size;
  three's `GLTFLoader` reads `EXT_texture_webp` natively (no extra loader).
  Switch to KTX2/Basis only if GPU memory becomes the problem.
- Whether to keep Blender: only for **planar-dissolve decimation** of very
  CAD-flat geometry, scripted junk removal, and the **proxy renders / raycasts**
  used to verify the camera path (there is usually no browser to look at).
- Keep a copy of the pipeline scripts in the repo (`docs/gltf-pipeline/`);
  scratchpad scripts get lost.

## A4. Re-author the camera path for a new model

If the model changed, `plaza-meta.json` / the old path do not apply. Steps:

1. **Measure the layout** in Blender (headless): import the centred GLB, print
   the bbox, the bbox of everything above some height (the tower), and a
   **raycast grid** (drop a ray every 6 m, print the top-surface height) to
   find the plaza floor, podium heights and open space.
   - glTF `(X,Y,Z)` ↔ Blender `(X,-Z,Y)`; meta `(x,y,z)` → Blender `(x,-z,y)`.
2. **Design** the route for the whole project, e.g.: wide aerial from one
   corner → sweep to the main approach → descend → walk the public space at eye
   level looking up at the mass → pull back and rise with the whole building in
   frame → over the roof → circle round → wide finish.
3. Write the JSON (strict; one waypoint per line is easy to diff).
4. **Verify** with `pathcheck.py`-style Blender script: implement three's
   centripetal Catmull-Rom (`getPoint(t)` in index space), sample ~140 points,
   raycast six directions + the view direction and flag anything within
   ~2.5 m of geometry or looking at a wall < 6 m away; render 12 Workbench
   stills and make a contact sheet.
5. Iterate. Lessons from this run:
   - Too many waypoints hugging one facade = monotonous. Pull back so the whole
     tower stays in frame while rising.
   - **Most shots look down at the model**, so only the lowest few degrees of
     sky ever appear on screen (this mattered for the sky — see A6).
   - Equal scroll time per segment: short segments go by fast. Use `pacing`
     to slow the plaza walk.
   - Eye level in a plaza: ~4–5 m above the floor reads better than 2 m.
   - **Blender API gotchas:** `Vector.normalize()` returns `None` (use
     `.normalized()`); pass **absolute** output paths to `render`.
   - Workbench renders far/high cameras as flat grey — trust the raycast.

## A5. Page changes for a textured model

- Point `MODEL_URL` / `META_URL` / `PATH_JSON_URL` at the new files. Old files
  stay untouched; git history + naming (`plaza-textured-*`) keep both.
- **Interior reveal off** when there is no modelled interior: `roofVis(u)`
  returns 1 (the clipping-plane code stays; only the animation is neutralised).
- **Material tuning must respect real textures.** The old pass forced
  `roughness < 0.25 → 0.7` for everything (CAD exports mirrors); guard it with
  `!mat.map`. `Metal`/`SS`/`parquewt` name rules still apply.
- **Transmission glass → plain transparency.** `KHR_materials_transmission`
  makes three run an expensive transmission pass. Record
  `wasTransmissive = mat.transmission > 0` **before** zeroing it, then treat it
  as glass (`transparent`, `depthWrite = false`, `DoubleSide`). Glass material
  names change with the export (`Rail glass` → `Rail_glass`) — refresh
  `GLASS_NAMES` / the meta `glass_materials` list.
- **Glass look** — two modes behind `const DARK_GLASS`:
  - `false`: 75 % opacity (railings 45 %), roughness 0.06, `envMapIntensity` 1.6
    (reads bright/white).
  - `true`: per-material tint table `GLASS_TINT` — dark blue-charcoal curtain
    wall, smoky warm-grey shopfronts, near-black revolving door, lightly tinted
    railings; roughness 0.18, `envMapIntensity` 0.5. Matches the client render.
  - Which material is "shopfront glass" was a guess (the dark, transmissive,
    ~3 k-triangle one); confirm by checking which meshes use it.
- Rewrite the chapter copy (`<section class="step" data-at=…>`) to match the
  new route, and set each `data-at` to where that part of the path falls in `u`.

## A6. Sky + ground (`ENV_BACKDROP`)

A "SKY + GROUND" block after the lighting. Everything is code — no image files.

- **Sky dome:** a `SphereGeometry` with a custom `ShaderMaterial`
  (`side: BackSide`, `depthWrite/depthTest: false`, `fog: false`,
  `renderOrder: -1000`), gradient by `dir.y` plus a warm glow toward a low sun
  direction and procedural fbm clouds (uniform `uOctaves`: 4 high tier, 2 low).
  Include `<tonemapping_fragment>` and `<colorspace_fragment>` so it matches the
  scene's ACES output (and the fog colour lines up at the horizon).
- **Ground:** a large `CircleGeometry` at `y = -0.4` (just under the model's
  lowest point), `MeshStandardMaterial` with a tiled `CanvasTexture` generated
  in JS (olive base, patches of sage/tan, fine grain; blobs are drawn at ±512
  offsets so the tile wraps without seams; deterministic seed), `receiveShadow`.
- **Fog:** `FogExp2` coloured like the horizon haze so the ground melts into
  the sky.
- Colours are single hex constants at the top (`SKY_HORIZON`, `SKY_HAZE`,
  `SKY_MID`, `SKY_ZENITH`); `ENV_BACKDROP = false` restores the plain background.

**Sky gotchas (this cost several rounds):**
- **The dome was invisible for a long time because it was outside the far
  plane.** `frameEverything()` sets `camera.far = modelSize * 20` (~2.8 km here);
  a 10 km-radius dome is clipped entirely, leaving only the fallback
  `scene.background`. Fix: keep the dome centred on the camera
  (`dome.onBeforeRender = (r, s, cam) => dome.position.copy(cam.position)`) and
  scale it to ~85 % of `camera.far` inside `frameEverything`.
  **If a "sky" looks like one flat colour that ignores your edits, suspect
  clipping before colour tuning.**
- **ACES tone mapping desaturates** everything toward a mid-tone. Use more
  saturated stops than you think you need.
- **Most tour shots look down**, so put the colour change (haze → blue) within
  the first ~5–10° above the horizon.
- Validate custom GLSL without a GPU: `@webgpu/glslang`
  (`dist/web-devel-onefile/glslang.js`), wrap the fragment shader in a
  `#version 450` prelude with the uniforms in a UBO, and `compileGLSL(src,
  'fragment')`. It catches syntax errors (it does **not** catch a clipped mesh).

## A7. Verifying without a browser

No headless browser was available at any point. What was used:
`node --check` on the module script (strip the `import` lines first), `curl`
for 200s on the page / GLB / JSON / CDN URLs, Blender raycasts + Workbench
stills for the path, `gltf-transform`-based inspection for the model, and the
glslang WASM validator for shaders. **The user's own screenshots were the real
test** — ask for one whenever visuals are in question; it found the far-plane
bug that several rounds of colour tweaking had not.

## A8. Repeatable checklist (Workflow A)

> **Confirmed fix (2026-09-29, verified by the user in the browser):** the
> tower looked wrong (missing floor slabs, lost tile texture, smeared glass
> reflections) because `opt.mjs` deleted `Line###` nodes as "junk", simplified
> glass/textured meshes too hard, and left curtain-wall normals smoothed. Fix =
> delete only `Obj_Polyline_*`; protect glass + textured prims from `simplify`
> (LINES-mode trick); flat normals on the curtain wall; shift path heights +3.3 m
> after the lowest point moved. Detect this class of bug by *comparing renders
> against the source*, not by tuning materials.

1. Export a GLB from the authoring app with real materials (Original, or
   Baked for renderer materials). Verify in `gltf-viewer.donmccurdy.com`.
   Read the exporter log.
2. Put it in `assets/models/`, **add it to `.gitignore`** if it's large.
3. `node summ.mjs` — textures? fallback materials? transmission? bbox vs old?
3b. **Before editing the junk filter in `opt.mjs`, run `node lines.mjs`** on the
   name prefix you plan to delete. Only delete nodes that are flat / untextured /
   tiny. (`Line###` = the tower slabs; `Obj_Polyline_*` = the only real junk.)
4. `node opt.mjs src.glb out.glb 0.5 0.0005` → copy to `plaza-<name>.glb`.
   **Then `compare.py`: same camera on source vs output, side by side** (and per
   stage if anything differs). Also `node normals.mjs out.glb` for glass.
   Do this *before* touching the camera path, sky or glass.
4b. If the kept geometry changed, the lowest point (`center` → y=0) may have
   moved: re-run `analyze.py`, and shift the path / meta heights to match.
5. Measure the layout in Blender; write `plaza-<name>-meta.json` (bbox, tower
   bbox, ground floor y, glass material names).
6. Author `plaza-<name>-camera-path.json`; raycast + contact-sheet it; iterate.
7. Update the page: URLs, disable reveal if no interior, texture-safe material
   tuning, transmission → transparency, glass mode, chapter copy.
8. Add sky + ground; tune with screenshots from the user.
9. `node --check`, `curl` checks; commit the GLB (small), not the source.

---

# Workflow B — raw CAD `.blend` (legacy, original prototype)

Kept for the case where no authoring file exists. Phases 3–5 below (camera
path, scroll binding, page and performance) apply to **both** workflows.

- **Input:** one raw `.blend` (straight CAD import, no cleanup).
- **Approach:** five phases, each ending with a preview + a check-in.

---

## 0. Environment & tools

| tool | version / note |
|---|---|
| Blender | 5.2.1 LTS, run **headless**: `"/Applications/Blender.app/Contents/MacOS/Blender" --background <file.blend> --python script.py -- <args>` |
| glTF exporter | bundled `io_scene_gltf2`; Draco props are `export_draco_mesh_compression_*` |
| Node | for `node --check` syntax checks only |
| local server | `python3 -m http.server 8777 --bind 127.0.0.1` from the project root (ES modules + `fetch` need http, not `file://`) |
| three.js | `https://cdn.jsdelivr.net/npm/three@0.170.0/` — importmap keys `three` + `three/addons/` |
| DRACO decoder | `https://www.gstatic.com/draco/versioned/decoders/1.5.7/` (Google-hosted, always up) |
| GSAP + ScrollTrigger | `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js` + `.../ScrollTrigger.min.js` — **classic `<script>`**, globals `gsap` / `ScrollTrigger` |
| Lenis | `https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js` — classic `<script>`, global `Lenis` (package renamed from `@studio-freight/lenis`) |
| fonts | Google Fonts: DM Mono + Cairo (match the host site) |

No headless browser was available, so the page's WebGL output was **never seen
directly** during the build. Verification was: `node --check` on the module
script, `curl` for 200s + CDN reachability, and **Blender proxy renders** of the
same geometry/camera path.

### Coordinate spaces (this bites you repeatedly — keep it straight)

| space | meaning |
|---|---|
| **Blender** | Z-up, metres, as authored |
| **meta / glTF** | Y-up. Blender `(x,y,z)` → meta `(x, z, -y)`. This is what `plaza-meta.json` and `plaza-camera-path.json` use. |
| **scene (three.js world)** | meta space **plus** `modelOffset` (the recentre translation applied on load). `toScene(v) = v + modelOffset`, `toMeta(v) = v - modelOffset`. |
| **Blender re-import of the GLB** | glTF importer maps glTF `(X,Y,Z)` → Blender `(X, -Z, Y)`. So a meta point round-trips back to its original Blender coords; `blender.z == meta.Y`. |

---

## Phase 1 — Convert & optimise the model

### 1a. Inspect first (never convert blind)

Headless script that dumps: object/type counts, total tris & verts, world AABB,
per-mesh size & polycount histograms, name-prefix frequency, **materials**
(base colour, alpha, metallic, roughness, image-texture nodes), **images**
(`img.packed_file is not None`, `img.source`, filepath, on-disk?), loose-parts
count per big mesh, unapplied-scale count, parented count.

What the Bireh Plaza file turned out to be (typical for a raw CAD import):
- **9,289 objects** (7,725 mesh, 1,562 empties, 1 cam, 1 light), one flat
  Collection, **~1.86 M triangles**.
- Names are CAD primitives: `Box56218`, `ChamferBox013`, `3dSolid.040`,
  `Baluster Bracket 044`, `Square Truss125`, `Revolving_door_014`.
- **Zero image textures** — only Blender's internal `Render Result` / `Viewer
  Node`. All 38 materials are flat-colour Principled BSDF. → **"pack textures"
  and KTX2/Basis (Phase 5) are both no-ops.** Confirm this early.
- Draw calls, not polycount, are the problem: one material (`Metal`) had
  **1.1 M tris across ~4,700 tiny objects** (railings/balusters).
- Model is **not centred on origin**; ground floor sits at meta Y ≈ 9.4, with
  structure (parking) ~19 m below.
- ~170 far-outlier junk meshes: site survey polylines, stray boxes far from the
  building, a 98 m-tall empty reference box.

### 1b. The conversion pipeline (`phase1_convert.py`)

```
blender --background plaza2.blend --python phase1_convert.py -- assets/models balanced
```

1. **Delete** cameras, lights, empties, curves, text (lighting is code-side).
2. **Strip junk** — a spatial "bubble" around the building
   (`|x-cx|>hx or |y-cy|>hy or z<zmin or z>zmax`) plus a hard-remove name list
   plus a rule for oversized no-material low-poly reference boxes
   (`len(materials)==0 and max(dims)>35 and len(polygons)<=12`).
   Tune the bubble by re-running a probe that lists the largest & most-isolated
   remaining meshes.
3. **Apply transforms** (`transform_apply(location, rotation, scale)`) and
   `parent_clear(type='CLEAR_KEEP_TRANSFORM')` on all meshes — required before
   joining. (Thousands had unapplied scale.)
4. **Classify** each mesh SHELL vs INTERIOR by a spatial heuristic. **This did
   not work** — with unnamed CAD fragments and a plaza-deck-inflated AABB,
   ~99 % landed in one bucket. Kept the code + wrote the split GLBs, but the
   deliverable is the single `plaza-full.glb`. A real split needs 2 tagged
   collections in Blender.
5. **Merge by `(zone, first-material)`** — `remove_doubles(0.0005)` per object,
   then `bpy.ops.object.join()` per bucket. **7,654 → 57 objects.** This is the
   single biggest win (draw calls).
6. **Decimate** each merged mesh:
   - weld → **planar / DISSOLVE** decimate (`angle_limit ≈ radians(4)`) — near
     lossless on coplanar CAD faces, this alone does most of the work;
   - **COLLAPSE** decimate (ratio 0.35–0.7) only on the heavy structural
     buckets (`Metal`, `standar`, `SS`, stair core, elevator doors);
   - final TRIANGULATE.
   Result: **1.86 M → 569 k tris (~30 %)**.
7. **Export** GLB, `export_yup=True`, `export_apply=True`, Draco enabled
   (level 6, position quant 14, normal 10, texcoord 12), `export_extras=True`.
   Also export shell/interior GLBs (unreliable — see step 4).
8. **Write `plaza-meta.json`** — the one file phases 2–5 read: full & "core"
   AABBs (Y-up), `ground_floor_y`, `entry_point` (centre, inward/outward dir,
   opening size), `glass_materials` list, zone-split counts, a rough
   `camera_anchors_yup` starter path.

**Sizes:** source `.blend` 13.4 MB → `plaza-full.glb` **2.42 MB** (Draco).
A naive export of the raw scene would have been 60–120 MB.

### 1c. Pick the entry point

No entry was marked. Chosen: the **revolving door** — a tight cluster of 31
`Revolving_door_*` objects on the ground floor, west (low-X) facade. It's the
only unambiguous "walk through this" feature. Recorded in the meta as
`entry_point` (meta ≈ `(3.5, 11.3, -38.9)`, inward `+X`, opening ~2.8 m wide,
~2.2 m tall leaf; the bbox also catches surrounding storefront frame).
Verify by rendering an eye-level shot from the doorway looking inward.

### 1d. Preview

Rendered a few Blender **Workbench** stills (aerial 3/4, entry closeup,
elevation) as the Phase 1 preview — there is no page yet. **Set
`scene.display.shading.background_type = 'VIEWPORT'`** or the theme gradient
leaks into empty frames.

---

## Phase 2 — Basic scene

Single `3d-tour-test.html`, module `<script>` + importmap. No existing page
touched, not linked from the site.

- `WebGLRenderer({ antialias, powerPreference:'high-performance',
  logarithmicDepthBuffer:true })`, `ACESFilmicToneMapping`, exposure ~1.05.
  logdepth because of the big scale + tiny near plane.
- **Lighting in code, nothing baked**: `RoomEnvironment` → `PMREMGenerator`
  for neutral IBL (no `.hdr` file to ship) + one `DirectionalLight` "sun" with
  a shadow frustum fitted to the model + a low `HemisphereLight` fill.
- **Load**: `GLTFLoader` + `DRACOLoader().setDecoderPath(<gstatic CDN>)`.
  `LoadingManager` counts items only — wire the loading bar to `GLTFLoader`'s
  `onProgress` **ProgressEvent bytes** (`ev.lengthComputable`).
- **Recentre on load**: `box = Box3().setFromObject(model)`;
  `model.position.set(-ctr.x, -box.min.y, -ctr.z)`; store as `modelOffset`.
- **Material tuning pass** (by material name, source untouched): glass names
  (from `meta.glass_materials` + a hardcoded set) → `transparent`, low opacity,
  low roughness, `depthWrite=false`, `DoubleSide`; `water` → blue translucent;
  `parquewt` → timber brown (it exported pink); `Metal`/`SS` →
  actually metallic; everything else with `roughness < 0.25` → 0.7 (CAD
  exports everything as a mirror).
- `OrbitControls` (damped) + a small HUD showing camera pos/target in scene
  **and** meta space, plus debug keys (grid, entry marker).

---

## Phase 3 — Camera path

- **Two `CatmullRomCurve3`s** — one through the `pos` points, one through the
  `look` points — both `'centripetal'` (no cusps/overshoot), sampled by the
  **same** parameter via `getPoint(t)` (index-space, keeps pos↔look paired).
- **`applyPath(u)`**: `t = pace(u)`; `posCurve.getPoint(t)` → `camera.position`;
  `lookCurve.getPoint(t)` → `camera.lookAt`. `camera.up = (0,1,0)`, no roll.
- **`pace(u)`**: piecewise-linear remap of scrubber/scroll `u` → curve `t`
  (`[[0,0],[1,1]]` = linear). This is the pacing knob; it survives into Phase 4
  as scroll-distance weighting.
- **Definition lives in one place and is swappable**: `DEFAULT_WAYPOINTS` in
  the HTML **and** `assets/models/plaza-camera-path.json` (the page fetches it
  and it wins). JSON shape:
  ```json
  { "space": "meta", "curveType": "centripetal",
    "pacing": [[0,0],[1,1]],
    "waypoints": [ { "pos": [x,y,z], "look": [x,y,z] }, ... ] }
  ```
  **Must be valid JSON** — a stray `//` comment or trailing comma makes the
  page silently fall back to the built-in path.
- **Debug scrubber** (not scroll yet): a bottom bar with Manual scrub + play
  (adjustable duration) + a **Free** orbit mode + **`X` to capture** the
  current view as a waypoint + **Copy path JSON**. `X` in Free mode records
  `look = OrbitControls.target` (which only moves when you *pan*, not orbit —
  a captured "orbit view" aims at the pivot, usually the centre).

### Iterating the path without a browser

Blender proxy: implement centripetal Catmull-Rom in Python (Barry-Goldman),
sample it, place the camera at stops, render. Plus a **raycast check** — from
each waypoint, cast the view direction and a frustum grid; report distance to
first hit + nearest surface + inside-AABB.

Lessons:
- A Workbench render that is a **flat grey wall** when the raycast says the
  frustum is ~mostly sky = a **Workbench artifact for far/high cameras**, not a
  path bug. Trust the raycast.
- The exterior orbit must be **well outside the full AABB** (this model is
  ~155 m across; orbit radius 150–230 m). `look` Y near camera Y (near-level
  horizon) or the wide FOV fills the frame with the featureless ground slab.
- The interior of a raw CAD import is often a **solid podium mass** — no
  modelled rooms. The navigable space is the covered **colonnade** running off
  the entry. Keep the interior leg along it (`+X` at ~constant `z`); don't aim
  into the solid block.
- A **revolving door is a ~2.8 m slot** (`meta z` roughly `-37.4..-40.3` here)
  with a central hub. Thread the middle (`z ≈ -38.7`); `z ≈ -37.2` clips the
  wall beside it.
- Match the proxy camera FOV to the page: `sensor_fit='VERTICAL'`, `lens ≈ 39`
  for a 50° vertical FOV.

---

## Phase 4 — Scroll binding

### Scroll stack (no bundler)

- GSAP + ScrollTrigger + Lenis as **classic `<script>` globals**, read from
  `window` in the module (classic scripts run before deferred modules).
- A `#scroll-track` (or the content stack) gives the document height; the
  canvas is `position: fixed`.
- `gsap.registerPlugin(ScrollTrigger)`; a scrubbed tween of a proxy
  `{ u: 0 → 1 }`:
  ```js
  gsap.to(proxy, { u:1, ease:'none',
    scrollTrigger:{ trigger:'#story', start:'top top', end:'bottom bottom', scrub:true }});
  ```
- **Lenis**: `new Lenis({ lerp:0.1, ... })`; `lenis.on('scroll', ScrollTrigger.update)`;
  call `lenis.raf(timeMs)` **inside `renderer.setAnimationLoop((timeMs)=>…)`**
  (one rAF loop, `timeMs` is already ms). `lenis.start()/stop()` on mode change.
- **Fallback**: if `window.gsap` is missing, read
  `scrollY / (scrollHeight - innerHeight)` directly. Same for
  `prefers-reduced-motion` (skip Lenis, ScrollTrigger still fine).
- Loop: `if (mode==='scroll') { u = proxy.u; applyPath(u); updateReveal(u); updateStory(u); }`
- `requestAnimationFrame(() => ScrollTrigger.refresh())` after load; refresh on
  resize.

### Exterior → interior reveal — use a **clipping plane**, not a fade

Merge-by-material (Phase 1) means there is **no separate "roof" mesh** to fade
(one `Metal` mesh spans ground to roof). A height test tagged only 1 of 57
meshes. So:

- `renderer.localClippingEnabled = true`.
- One **world-space** `THREE.Plane(new Vector3(0,-1,0), constant)` — keeps
  geometry where `y <= constant`. Assigned to **every** model material's
  `clippingPlanes`, with `clipShadows = true`.
- Animate `constant` from `ceilY + SWEEP` (nothing clipped, above the tower) to
  `ceilY` (sectioned to the ground-floor ceiling) via a `roofVis(u)` piecewise:
  full building until `u≈0.40`, section down by `u≈0.58`, held open through the
  interior, rebuild `0.86–1.0` for the closing "look back".
- `ceilY (scene) = meta.ground_floor_y + modelOffset.y + ~7`.
- Only refresh the shadow map when the plane actually moves
  (`renderer.shadowMap.autoUpdate=false` + `.needsUpdate=true` on change).
- **Outer walls are not removed** — that needs the real shell/interior split.
  Keeping the path inside the colonnade avoids wall clipping; the overhead mass
  (what blocks "seeing in") is what the plane handles.

Preview: Blender can't do an arbitrary clip plane cheaply, so `bmesh.ops.bisect_plane(..., clear_outer=True)` every mesh at the ceiling line and render — that's what the plane produces at `u≈0.7`.

---

## Phase 5 — Loading, page, performance

### Make it a webpage

- **Loading screen**: practice mark, project name (EN + Arabic), hairline bar
  on real byte progress + a "model · N MB" status; fades to reveal the hero;
  on-page error text on failure.
- **Chapters locked to the camera, not to DOM scroll position**: a stack of
  `<section class="step" data-at="0.16">` etc.; in the loop, each panel's
  opacity = `smoothstep(1 - |u - data-at| / halfWidth)`. Guarantees the text
  matches what the camera is doing even if the panel isn't dead-centre in the
  viewport. Hero fades out fast near `u=0`; outro appears near `u=1`.
- **Chrome**: fixed wordmark → `index.html`; right-edge progress rail
  (`height = u*100%`) with chapter ticks; a permanent veil gradient
  (`radial` vignette + bottom `linear`) so text is always legible.
- **Style with the host site's tokens** — pull from `css/style.css`
  (`--cream #F1E7D3`, `--charcoal #1C1A17`, `--orange #D9541E`), DM Mono, Cairo
  for Arabic. Content over a dark 3D scene → cream text + charcoal-glass panels.
- Copy adapted from the site's own `js/projects-data.js` entry; labelled draft.
- Phase 2–4 dev tools collapsed behind a small "dev" toggle.

### Performance

- **Quality tiers** picked at load from `navigator.hardwareConcurrency` /
  `deviceMemory` / `(pointer:coarse) and (max-width:900px)`; override with
  `?q=lo` / `?q=hi`.
  | | high | low |
  |---|---|---|
  | pixelRatio | `min(dpr,2)` | 1 |
  | antialias | on | off (init-time only — can't toggle later) |
  | shadows | 2048 PCFSoft | off (boost hemi) |
  | logDepthBuffer | on | off (init-time only) |
- **Shadow map not redrawn per frame** — `shadowMap.autoUpdate=false`,
  `.needsUpdate=true` only when the clip plane moves.
- **Adaptive downgrade**: rolling fps; below ~38 for 2.5 s while scrolling →
  drop pixelRatio to 1 + shadows off, once (one-way), with a brief on-screen
  note.
- Render loop returns early on `document.hidden`; DOM writes throttled to
  actual change; `?stats` shows an fps/tier/dpr readout.
- **KTX2/Basis: N/A** — no textures.
- Fallbacks to keep in your back pocket for weak devices: a poster image +
  tap-to-load gate; or re-run Phase 1 with the `aggressive` decimation profile.

---

## Repeatable checklist

1. `blender --background src.blend --python inspect.py` → read the JSON dump.
   Confirm: texture situation, tri count, whether it's origin-centred, junk
   outliers, which materials are the big draw-call hogs.
2. Write/adjust `phase1_convert.py` (bubble + hard-remove list from a probe),
   run it → `plaza-full.glb` + `plaza-meta.json`. Report before/after sizes.
3. Pick + record the entry point. Render 3–4 Workbench stills.
4. `3d-tour-test.html` skeleton: importmap, renderer, RoomEnvironment + sun,
   DRACO GLB load, recentre, material tuning, byte-progress loader,
   OrbitControls + HUD.
5. Add the two Catmull-Rom curves + `applyPath` + `pace` + the debug scrubber +
   `plaza-camera-path.json` override + `X`-capture.
6. Author the path: Blender proxy renders + raycast checks; iterate `pos`/`look`
   in the JSON. Thread the entry slot. Keep the interior leg in the real
   navigable space.
7. Add GSAP ScrollTrigger scrub + Lenis (classic scripts) + `#scroll-track` +
   proxy tween + `lenis.raf` in the loop + native/reduced-motion fallback.
8. Add the clipping-plane reveal (`roofVis(u)`, world Plane, `clipShadows`,
   shadow `needsUpdate` on change).
9. Wrap it in the page: loading screen, chapters locked to `u`, progress rail,
   wordmark, veil, host-site tokens, collapse the dev bar.
10. Perf: quality tiers, `shadowMap.autoUpdate=false`, adaptive downgrade,
    hidden-tab skip, `?stats`.
11. Validate each phase: `node --check` the module script, `curl` for 200s +
    CDN reachability, Blender proxy renders. Check in with the user.

## Gotchas (the ones that actually cost time here)

- **JSON must be strict** — `//` comments / trailing commas silently disable the
  path override file.
- **Merge-by-material kills per-region fades.** Plan the exterior→interior
  reveal as a **clipping plane**, or split geometry into 2 collections in
  Blender *before* the convert.
- **`prefers-reduced-motion` + no-GSAP fallbacks** are not optional — the whole
  page is scroll-driven.
- **Blender Workbench renders far/high cameras as flat grey.** Use raycasts to
  verify framing, and `background_type='VIEWPORT'`.
- **`antialias` and `logarithmicDepthBuffer` are fixed at renderer creation** —
  decide the quality tier before `new WebGLRenderer`.
- **Lenis package is `lenis`** (not `@studio-freight/lenis`); `dist/lenis.min.js`
  sets `globalThis.Lenis`.
- The camera-path coordinate space is **meta / glTF Y-up**, and Blender →
  meta is `(x,y,z) → (x, z, -y)`. Everything downstream assumes it.

## File inventory

| file | role |
|---|---|
| `assets/objects/plaza2.blend` | Workflow B source (untouched) |
| `assets/models/glb with converted materials.glb` | Workflow A source, 198 MB, **gitignored** |
| `assets/models/plaza-textured.glb` | **current model** (Draco + WebP, 8.0 MB, 977 k tris, centred) |
| `assets/models/plaza-textured-meta.json` | bbox, tower bbox, ground floor y, glass names |
| `assets/models/plaza-textured-camera-path.json` | **current camera path** (exterior flythrough) |
| `assets/models/plaza-full.glb`, `plaza-meta.json`, `plaza-camera-path.json` | old raw-CAD model + its meta/path — no longer match the page |
| `assets/models/plaza-shell.glb` / `plaza-interior.glb` | split attempt from Workflow B — unreliable, unused |
| `3d-tour-test.html` | the whole thing — scene, path, scroll, sky/ground, page, perf |
| `docs/gltf-pipeline/opt.mjs` | Workflow A optimiser (junk regex + fallback-material fix are model-specific) |
| `docs/gltf-pipeline/summ.mjs` | Workflow A inspector |
| `docs/gltf-pipeline/door.mjs` | landmark bbox + fallback-material usage + UV coverage |
| `docs/gltf-pipeline/lines.mjs` | lists candidate-junk nodes (tris, material, bbox) — run before deleting by name |
| `docs/gltf-pipeline/normals.mjs` | per-material normal-vs-face deviation (finds over-smoothed glass) |
| `docs/3d-scroll-tour-playbook.md` | this file |

Blender scripts from Workflow B (`inspect*.py`, `phase1_convert.py`,
`phase1_preview.py`, `phase3_preview.py`, `phase3_raycheck.py`,
`phase4_preview.py`, `phase4_section.py`, `mockup.py`) and the Workflow A
`pathcheck.py` / `analyze.py` lived in the session scratchpad — not committed.
Re-derive from the descriptions above, or ask to have them added to
`docs/blender/`.

## Scroll pacing + caption checkpoints (added 2026-09-29)

- `#story` is only a scroll *track*; its height is set from `TOUR` by `buildSlow()`. Each `.step` is `position: fixed` and faded by `updateStory(u)`, so a caption is on screen exactly while the camera is at its `data-at`.
- **Constant speed + smooth slowdown:** `scrollU()` maps scroll fraction -> path progress `u` at constant speed (`TOUR.travelVh` of scroll for the whole path), easing down to `TOUR.slow` x speed within `TOUR.slowHalf` of each caption checkpoint (cumulative-weight table in `buildSlow()`), then back up. The caption is fully visible within `fullHalf` of its checkpoint. No full stops, no snapping, no flick-catching (they made the speed feel inconsistent).
- Tune in the `TOUR` block: `travelVh`, `slow`, `slowHalf`, `wheel`, `lerp`, `fadeHalf`, `fullHalf`. Adding/moving a caption = change its `data-at`; the knot table rebuilds from the DOM.
