import sharp from 'sharp';
const W=1920,H=1080,CX=959,CY=406,D=745;
const CUT='flow/v9-cut.png';

const {data,info}=await sharp(CUT).raw().toBuffer({resolveWithObject:true});
const w=info.width,h=info.height;

// bbox real do sujeito
let top=1e9,bot=-1,left=1e9,right=-1;
for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  if(data[(y*w+x)*4+3]>60){ if(x<left)left=x; if(x>right)right=x; }
}
// topo/base pela MASSA da cabeca (ignora fios soltos)
const linha=new Array(h).fill(0);
for(let y=0;y<h;y++)for(let x=0;x<w;x++){ if(data[(y*w+x)*4+3]>60) linha[y]++; }
const maxL=Math.max(...linha), lim=maxL*0.15;
let topReal=0, baseReal=h-1;
for(let y=0;y<h;y++){ if(linha[y]>=lim){ topReal=y; break; } }
for(let y=h-1;y>=0;y--){ if(linha[y]>=lim){ baseReal=y; break; } }
top=topReal; bot=baseReal;
const curAlt=bot-top;

// ALVO: topo y=61, altura 1018, ancoragem INFERIOR na base do frame (y=1080)
// ancoragem inferior significa: base do sujeito encosta em y=1080
const ALVO_H=1018, ALVO_TOP=61;
const ALVO_BOTTOM=ALVO_TOP+ALVO_H;   // 1079
const scale=ALVO_H/curAlt;           // transformacao UNIFORME

console.log('atual: top',top,'alt',curAlt,'| escala',scale.toFixed(5),'| alvo top',ALVO_TOP,'bottom',ALVO_BOTTOM);

const escW=Math.round(w*scale), escH=Math.round(h*scale);

// recorta janela ao redor do sujeito antes de escalar
const PAD=60;
const cL=Math.max(0,left-PAD), cT=Math.max(0,top-PAD);
const cW=Math.min(w,right+PAD)-cL, cH=Math.min(h,bot+PAD)-cT;
const rec=await sharp(CUT).extract({left:cL,top:cT,width:cW,height:cH}).png().toBuffer();
const rW=Math.round(cW*scale), rH=Math.round(cH*scale);
const esc=await sharp(rec).resize(rW,rH,{fit:'fill'}).png().toBuffer();

// posicao a partir da ANCORA INFERIOR
const offTop=Math.round(ALVO_BOTTOM-(bot-cT)*scale);
const centroX=((left+right)/2-cL)*scale;
const offLeft=Math.round(CX-centroX);

// recorta so o que aparece dentro do canvas
const cutT=Math.max(0,-offTop);
const visH=Math.min(rH-cutT, H-Math.max(0,offTop));
const finalEsc=await sharp(esc).extract({left:0,top:cutT,width:rW,height:visH}).png().toBuffer();

const bg=Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#060a0e"/>
  <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/></svg>`);

await sharp(bg).composite([{input:finalEsc,left:offLeft,top:Math.max(0,offTop)}]).png().toFile('flow/v12-FINAL.png');

// mede o resultado
const chk=await sharp('flow/v12-FINAL.png').raw().toBuffer({resolveWithObject:true});
const cw=chk.info.width,cc=chk.info.channels;
let st=1e9,sb=-1;
for(let y=0;y<chk.info.height;y++)for(let x=0;x<cw;x++){
  const i=(y*cw+x)*cc;
  const r=chk.data[i],g=chk.data[i+1],b=chk.data[i+2];
  const isY=r>175&&g>125&&g<240&&b<105;
  if(!isY){ const lum=(r+g+b)/3; if(lum>60){ if(y<st)st=y; if(y>sb)sb=y; } }
}
console.log('RESULTADO: topo',st,'base',sb,'altura',sb-st);
