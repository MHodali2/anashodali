# Scroll-driven 3D architectural tour — build playbook

How `3d-tour-test.html` (the Bireh Plaza walkthrough prototype) was built, start
to finish, so it can be repeated for another project / model.

- **Input:** one raw `.blend` (straight CAD import, no cleanup).
- **Output:** one standalone HTML page + a handful of derived assets. No
  bundler, no framework, no changes to any existing page.
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
| `assets/objects/plaza2.blend` | source (untouched) |
| `assets/models/plaza-full.glb` | the deliverable model (Draco, ~2.4 MB) |
| `assets/models/plaza-shell.glb` / `plaza-interior.glb` | split attempt — unreliable, not used |
| `assets/models/plaza-meta.json` | AABBs, entry point, glass list, camera anchors — read by the page |
| `assets/models/plaza-camera-path.json` | the camera path; edit + reload, overrides the built-in |
| `3d-tour-test.html` | the whole thing — scene, path, scroll, reveal, page, perf |
| `docs/3d-scroll-tour-playbook.md` | this file |

Blender scripts (`inspect*.py`, `phase1_convert.py`, `phase1_preview.py`,
`phase3_preview.py`, `phase3_raycheck.py`, `phase4_preview.py`,
`phase4_section.py`, `mockup.py`) lived in the session scratchpad — not yet
committed. Re-derive from the descriptions above, or ask to have them added to
`docs/blender/`.
