import sharp from 'sharp';

const W=1920, H=1080, CX=959, CY=406, D=745;
const SRC='flow/v10-flat.jpg';
const BGREF=[10,15,20], TOL=30;

// sujeito medido na origem 2048x2048
const SUB = { top:398, bottom:1691, left:735, right:1492 };

// 1) troca o fundo chapado por #060a0e exato (nao move nem recorta o rosto)
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject:true });
const w=info.width, h=info.height, ch=info.channels;
const flat=Buffer.from(data);
for(let i=0;i<w*h;i++){
  const p=i*ch;
  const d=Math.max(Math.abs(data[p]-BGREF[0]),Math.abs(data[p+1]-BGREF[1]),Math.abs(data[p+2]-BGREF[2]));
  if(d<=TOL){ flat[p]=6; flat[p+1]=10; flat[p+2]=14; }
}
const flatPng = await sharp(flat,{raw:{width:w,height:h,channels:ch}}).png().toBuffer();

// 2) recorta com margem generosa em volta do sujeito (nunca corta cabelo/ombros)
const PAD=120;
const cropL=Math.max(0,SUB.left-PAD);
const cropT=Math.max(0,SUB.top-PAD);
const cropR=Math.min(w,SUB.right+PAD);
const cropB=Math.min(h,SUB.bottom+PAD);
const cropW=cropR-cropL, cropH=cropB-cropT;
const recorte = await sharp(flatPng).extract({left:cropL,top:cropT,width:cropW,height:cropH}).png().toBuffer();
const rm = { w:cropW, h:cropH };
console.log('recorte', rm.w+'x'+rm.h, 'origem do sujeito dentro dele:', (SUB.left-cropL)+','+(SUB.top-cropT));

// 3) escala: altura do sujeito 1293 -> 1018 (como a estatua de referencia)
const alvoH = 820;   // cabe no canvas com folga
const scale = alvoH / (SUB.bottom-SUB.top);
const escW = Math.round(rm.w*scale);
const escH = Math.round(rm.h*scale);
console.log('escala', scale.toFixed(3), '-> recorte escalado', escW+'x'+escH);

const escalado = await sharp(recorte).resize(escW, escH, {fit:'fill'}).png().toBuffer();

// 4) posicao: topo do cabelo em y=61; centro horizontal em CX
const sujeitoTopNoRecorte = (SUB.top-cropT)*scale;
const offTop = Math.round(61 - sujeitoTopNoRecorte);
const centroRostoX = ((SUB.left+SUB.right)/2 - cropL)*scale;
const offLeft = Math.round(CX - centroRostoX);
console.log('offset', offLeft, offTop);

// 5) canvas: fundo + circulo + sujeito
const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#060a0e"/>
  <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/></svg>`);

await sharp(bg).composite([{input:escalado, left:offLeft, top:offTop}]).png().toFile('flow/v10-FINAL.png');
console.log('v10-FINAL.png OK');
