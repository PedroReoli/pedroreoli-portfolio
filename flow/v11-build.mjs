import sharp from 'sharp';
const W=1920,H=1080,CX=959,CY=406,D=745;
const CUT='flow/v9-cut.png';

const {data,info}=await sharp(CUT).raw().toBuffer({resolveWithObject:true});
const w=info.width,h=info.height;
const SUB={left:183,top:181,right:2047,bottom:2047};

// escala pela ALTURA do sujeito -> 1018 (mesma da referencia da estatua)
const ALVO_H=1018;
const scale=ALVO_H/(SUB.bottom-SUB.top);
const escW=Math.round(w*scale), escH=Math.round(h*scale);

// recorta uma janela ao redor do sujeito ANTES de escalar, para caber no canvas
const PAD=40;
const cL=Math.max(0,SUB.left-PAD), cT=Math.max(0,SUB.top-PAD);
const cW=Math.min(w,SUB.right+PAD)-cL, cH=Math.min(h,SUB.bottom+PAD)-cT;
const recorte=await sharp(CUT).extract({left:cL,top:cT,width:cW,height:cH}).png().toBuffer();

const rH=Math.round(cH*scale), rW=Math.round(cW*scale);
const escalado=await sharp(recorte).resize(rW,rH,{fit:'fill'}).png().toBuffer();

const offTop=Math.round(61-(SUB.top-cT)*scale);
const centroX=((SUB.left+SUB.right)/2-cL)*scale;
const offLeft=Math.round(CX-centroX);

const bg=Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#060a0e"/>
  <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/></svg>`);

// ajusta overflow vertical
const cutT=Math.max(0,-offTop);
const visH=Math.min(rH-cutT, H-Math.max(0,offTop));
const finalEsc=await sharp(escalado).extract({left:0,top:cutT,width:rW,height:visH}).png().toBuffer();

await sharp(bg).composite([{input:finalEsc,left:offLeft,top:Math.max(0,offTop)}]).png().toFile('flow/v11-FINAL.png');
console.log('v11-FINAL.png | escala',scale.toFixed(4),'| offset',offLeft,Math.max(0,offTop),'| sujeito',rW+'x'+rH);
