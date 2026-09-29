import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder': await draco3d.createDecoderModule()});
const doc = await io.read(process.argv[2]);
for (const p of doc.getRoot().listMeshes().flatMap(m=>m.listPrimitives())) {
  const mat=p.getMaterial(); const nm=mat.getName();
  if (!/1541173878|glass|1541173997|Rail|1541173809|M_01___Default$|tiles$/.test(nm)) continue;
  const P=p.getAttribute('POSITION'), N=p.getAttribute('NORMAL'), I=p.getIndices(); if(!N) {console.log(nm,'NO NORMALS'); continue;}
  const tris=I.getCount()/3; const step=Math.max(1,Math.floor(tris/20000)); let sum=0,cnt=0,big=0;
  const a=[0,0,0],b=[0,0,0],c=[0,0,0],na=[0,0,0];
  for(let t=0;t<tris;t+=step){ const i0=I.getScalar(t*3),i1=I.getScalar(t*3+1),i2=I.getScalar(t*3+2);
    P.getElement(i0,a);P.getElement(i1,b);P.getElement(i2,c);
    const e1=[b[0]-a[0],b[1]-a[1],b[2]-a[2]], e2=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
    let f=[e1[1]*e2[2]-e1[2]*e2[1], e1[2]*e2[0]-e1[0]*e2[2], e1[0]*e2[1]-e1[1]*e2[0]]; const l=Math.hypot(...f); if(l<1e-9) continue; f=f.map(x=>x/l);
    for (const i of [i0,i1,i2]){ N.getElement(i,na); const d=Math.abs(f[0]*na[0]+f[1]*na[1]+f[2]*na[2]); const ang=Math.acos(Math.min(1,d))*180/Math.PI; sum+=ang; cnt++; if(ang>10) big++; } }
  console.log(nm.padEnd(24), 'tris', tris, 'meanDevDeg', (sum/cnt).toFixed(2), 'vertsOver10deg', (100*big/cnt).toFixed(1)+'%');
}
