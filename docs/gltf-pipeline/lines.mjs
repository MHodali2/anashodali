import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder': await draco3d.createDecoderModule()});
const doc = await io.read('src.glb'); const root = doc.getRoot();
function tx(m,p){return [m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12], m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13], m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]];}
const rows=[]; const byMat={};
for (const n of root.listNodes()) { if(!/^(Obj_Polyline|Line)/i.test(n.getName())) continue; const me=n.getMesh(); if(!me) continue; const M=n.getWorldMatrix();
  const mn=[1e9,1e9,1e9], mx=[-1e9,-1e9,-1e9]; let tris=0, mats=new Set();
  for (const p of me.listPrimitives()){ const a=p.getAttribute('POSITION'); const lo=a.getMin([]),hi=a.getMax([]);
    for(const cx of [lo[0],hi[0]])for(const cy of [lo[1],hi[1]])for(const cz of [lo[2],hi[2]]){const w=tx(M,[cx,cy,cz]);for(let i=0;i<3;i++){mn[i]=Math.min(mn[i],w[i]);mx[i]=Math.max(mx[i],w[i]);}}
    tris += p.getIndices()? p.getIndices().getCount()/3 : 0; mats.add(p.getMaterial()?.getName()+(p.getMaterial()?.getBaseColorTexture()?'[TEX]':'')); }
  rows.push({name:n.getName(), tris, mats:[...mats].join('|'), size:mx.map((v,i)=>+(v-mn[i]).toFixed(1)), min:mn.map(v=>+v.toFixed(1))});
  for (const m of mats) byMat[m]=(byMat[m]||0)+1; }
console.log('nodes', rows.length, 'total tris', rows.reduce((s,r)=>s+r.tris,0)); console.log('by material', JSON.stringify(byMat));
rows.sort((a,b)=>b.tris-a.tris); for (const r of rows.slice(0,25)) console.log(JSON.stringify(r));
