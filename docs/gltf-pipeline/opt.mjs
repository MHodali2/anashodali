import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTTextureWebP } from '@gltf-transform/extensions';
import { dedup, flatten, join, weld, simplify, resample, prune, textureCompress, draco, getBounds, center } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3dgltf';
import sharp from 'sharp';
const [,, inp, out, ratioArg, errStr] = process.argv; const ratio = +(ratioArg||0.5); const errArg = +(errStr||0.0005);
await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
 'draco3d.decoder': await draco3d.createDecoderModule(), 'draco3d.encoder': await draco3d.createEncoderModule()});
const doc = await io.read(inp); const root = doc.getRoot();
const count = () => { let t=0,p=0; for (const m of root.listMeshes()) for (const pr of m.listPrimitives()){p++; const i=pr.getIndices(); t+=(i?i.getCount():pr.getAttribute('POSITION').getCount())/3;} return {prims:p, tris:Math.round(t)}; };
console.log('start', count());
// junk: ONLY the flat zero-height 'Obj_Polyline_*' sheets. NOTE: 'Line###' nodes are REAL geometry (tower floor
// slabs, paving, core, rail glass) -- deleting them by name prefix removed the slabs. Check bbox/materials first.
for (const n of root.listNodes()) if (/^Obj_Polyline/i.test(n.getName())) n.dispose();
// fix "fallback" mirror materials
for (const m of root.listMaterials()) if (m.getName()==='fallback Material'){ m.setMetallicFactor(0).setRoughnessFactor(0.85).setBaseColorFactor([0.62,0.6,0.56,1]); }
await doc.transform(prune(), flatten(), dedup());
await doc.transform(join({keepMeshes:false,keepNamed:false}), weld({tolerance:0.0001}));
console.log('joined', count());
// Simplify ONLY untextured, opaque geometry (railings, structure). Glass and UV-textured meshes are left
// untouched: collapsing them warps flat facade grids and smears tile textures. (simplify() skips any
// primitive that isn't a triangle list, so protected prims are flipped to LINES for the call (POINTS has its own path).)
const isProtected = (m) => !m || m.getBaseColorTexture() || m.getAlphaMode() !== 'OPAQUE' ||
  m.getExtension('KHR_materials_transmission') || /glass|screen/i.test(m.getName());
const kept = [];
for (const mesh of root.listMeshes()) for (const pr of mesh.listPrimitives())
  if (isProtected(pr.getMaterial())) { kept.push([pr, pr.getMode()]); pr.setMode(1); }
await doc.transform(simplify({simplifier: MeshoptSimplifier, ratio, error: errArg, lockBorder:true}));
for (const [pr, mode] of kept) pr.setMode(mode);

// Curtain wall: the export smooths normals across panel corners (~10% of vertices >10deg off the panel plane),
// which smears reflections along panel edges. Panels are flat -> give this mesh true per-face normals.
const FLAT_SHADED = /^Material__1541173878$/;      // tower curtain wall (model-specific)
function flatShade(prim) {
  const idx = prim.getIndices(), n = idx.getCount(), sems = prim.listSemantics(), buf = root.listBuffers()[0];
  const src = {}, out = {};
  for (const sm of sems) { src[sm] = prim.getAttribute(sm); out[sm] = new (src[sm].getArray().constructor)(n * src[sm].getElementSize()); }
  for (let i = 0; i < n; i++) { const vi = idx.getScalar(i);
    for (const sm of sems) { const es = src[sm].getElementSize(), a = src[sm].getArray(); for (let k = 0; k < es; k++) out[sm][i*es + k] = a[vi*es + k]; } }
  const P = out.POSITION, N = out.NORMAL;
  for (let t = 0; t < n; t += 3) {
    const e1 = [P[(t+1)*3]-P[t*3], P[(t+1)*3+1]-P[t*3+1], P[(t+1)*3+2]-P[t*3+2]];
    const e2 = [P[(t+2)*3]-P[t*3], P[(t+2)*3+1]-P[t*3+1], P[(t+2)*3+2]-P[t*3+2]];
    let f = [e1[1]*e2[2]-e1[2]*e2[1], e1[2]*e2[0]-e1[0]*e2[2], e1[0]*e2[1]-e1[1]*e2[0]]; const l = Math.hypot(...f) || 1; f = f.map(x => x / l);
    for (let v = 0; v < 3; v++) { N[(t+v)*3] = f[0]; N[(t+v)*3+1] = f[1]; N[(t+v)*3+2] = f[2]; } }
  for (const sm of sems) prim.setAttribute(sm, doc.createAccessor().setType(src[sm].getType()).setArray(out[sm]).setBuffer(buf).setNormalized(src[sm].getNormalized()));
  const seq = new Uint32Array(n); for (let i = 0; i < n; i++) seq[i] = i;
  prim.setIndices(doc.createAccessor().setType('SCALAR').setArray(seq).setBuffer(buf));
}
for (const mesh of root.listMeshes()) for (const pr of mesh.listPrimitives())
  if (FLAT_SHADED.test(pr.getMaterial()?.getName() || '') && pr.getAttribute('NORMAL')) flatShade(pr);
console.log('simplified', count());
await doc.transform(
  textureCompress({encoder: sharp, targetFormat:'webp', resize:[2048,2048], quality:82}),
  prune(), draco({method:'edgebreaker', quantizePosition:14, quantizeNormal:10, quantizeTexcoord:12}));
await doc.transform(center({pivot:'below'}));
const b = getBounds(doc.getRoot().listScenes()[0]); console.log('bounds', JSON.stringify(b));
await io.write(out, doc);
