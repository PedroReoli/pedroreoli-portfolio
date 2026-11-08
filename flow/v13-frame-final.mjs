import sharp from 'sharp';
const W=1920,H=1080,CX=959,CY=406,D=745;
const CUT='flow/real-cut.png';
const SUB={top:126,bottom:1253};

const ALVO_H=1018, ALVO_BOTTOM=61+ALVO_H;   // 1079
const m=await sharp(CUT).metadata();
const scale=ALVO_H/(SUB.bottom-SUB.top);
const escW=Math.round(m.width*scale), escH=Math.round(m.height*scale);
const esc=await sharp(CUT).resize(escW,escH,{fit:'fill'}).png().toBuffer();

// centraliza horizontal pelo centro de massa do sujeito
const {data,info}=await sharp(CUT).raw().toBuffer({resolveWithObject:true});
const w=info.width,h=info.height;
let sx=0,n=0;
for(let y=0;y<h;y++)for(let x=0;x<w;x++) if(data[(y*w+x)*4+3]>60){sx+=x;n++;}
const centroX=sx/n;
const offLeft=Math.round(CX-centroX*scale);
const offTop=Math.round(ALVO_BOTTOM-SUB.bottom*scale);

const cutT=Math.max(0,-offTop);
const visH=Math.min(escH-cutT,H-Math.max(0,offTop));
const aj=await sharp(esc).extract({left:0,top:cutT,width:escW,height:visH}).png().toBuffer();

const bg=Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
 <rect width="${W}" height="${H}" fill="#060a0e"/>
 <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/></svg>`);

await sharp(bg).composite([{input:aj,left:offLeft,top:Math.max(0,offTop)}]).png().toFile('flow/v13-FRAME-FINAL.png');
console.log('frame final gerado | escala',scale.toFixed(4),'| off',offLeft,Math.max(0,offTop));
