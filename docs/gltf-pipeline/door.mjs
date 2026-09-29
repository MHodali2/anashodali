import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder': await draco3d.createDecoderModule()});
const doc = await io.read('src.glb'); const root = doc.getRoot();
function tx(m,p){return [m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12], m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13], m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]];}
function bbox(nodes){const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];let n=0;
 for(const nd of nodes){const me=nd.getMesh(); if(!me) continue; const M=nd.getWorldMatrix();
  for(const p of me.listPrimitives()){const a=p.getAttribute('POSITION'); const lo=a.getMin([]),hi=a.getMax([]);
   for(const cx of [lo[0],hi[0]])for(const cy of [lo[1],hi[1]])for(const cz of [lo[2],hi[2]]){const w=tx(M,[cx,cy,cz]);for(let i=0;i<3;i++){mn[i]=Math.min(mn[i],w[i]);mx[i]=Math.max(mx[i],w[i]);}} n++;}}
 return {min:mn.map(v=>+v.toFixed(2)),max:mx.map(v=>+v.toFixed(2)),n};}
const nodes=root.listNodes();
console.log('revolving', JSON.stringify(bbox(nodes.filter(n=>/^Revolving/i.test(n.getName())))));
console.log('scene root nodes', root.listScenes()[0].listChildren().length, 'root xforms', JSON.stringify(root.listScenes()[0].listChildren().slice(0,3).map(n=>[n.getName(),n.getTranslation(),n.getRotation(),n.getScale()])));
// fallback material usage
const fb={}; for(const m of root.listMeshes())for(const p of m.listPrimitives()){const mt=p.getMaterial(); const k=mt?mt.getName():'none'; fb[k]=(fb[k]||0)+1;}
console.log('prims per material (top)', JSON.stringify(Object.entries(fb).sort((a,b)=>b[1]-a[1]).slice(0,12)));
// which top-level names use fallback
const fbN={}; for(const nd of nodes){const me=nd.getMesh(); if(!me)continue; for(const p of me.listPrimitives()){if(p.getMaterial()?.getName()==='fallback Material'){const k=nd.getName().replace(/[\d_\s.]+$/,''); fbN[k]=(fbN[k]||0)+1;}}}
console.log('fallback users', JSON.stringify(Object.entries(fbN).sort((a,b)=>b[1]-a[1]).slice(0,15)));
// UV presence
let withUV=0,tot=0; for(const m of root.listMeshes())for(const p of m.listPrimitives()){tot++; if(p.getAttribute('TEXCOORD_0'))withUV++;} console.log('prims with UV',withUV,'/',tot);
const tm={}; for(const t of root.listTextures()){} for(const m of root.listMaterials()){const t=m.getBaseColorTexture(); if(t){let c=0; for(const me of root.listMeshes())for(const p of me.listPrimitives()) if(p.getMaterial()===m) c++; console.log('textured',m.getName(),'prims',c,'uv',t.getSize().join('x'));}}
