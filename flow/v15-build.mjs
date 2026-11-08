import sharp from 'sharp';
const W=1920,H=1080,CX=959,CY=406,D=745;

// FUNDO VETORIAL (nunca tocado)
const bg=Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#060a0e"/>
  <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/></svg>`);

// CORPO: pega da v14 apenas a regiao do drapeado, e REMOVE o fundo do Gemini
// comparando com o fundo vetorial: onde a v14 e "fundo" (nao marmore), fica transparente
const v14=await sharp('flow/v14-1920.png').raw().toBuffer({resolveWithObject:true});
const ch=v14.info.channels;
const corpoRGBA=Buffer.alloc(W*H*4);
for(let i=0;i<W*H;i++){
  const p=i*ch;
  const r=v14.data[p],g=v14.data[p+1],b=v14.data[p+2];
  const lum=(r+g+b)/3;
  // marmore do drapeado e claro (>=60). abaixo disso = fundo escuro -> transparente
  const alpha = lum>=60 ? 255 : 0;
  corpoRGBA[i*4]=r; corpoRGBA[i*4+1]=g; corpoRGBA[i*4+2]=b; corpoRGBA[i*4+3]=alpha;
}
// recorta do corpo so de y=520 para baixo
const corpoFull=await sharp(corpoRGBA,{raw:{width:W,height:H,channels:4}}).png().toBuffer();
const corpo=await sharp(corpoFull).extract({left:0,top:640,width:W,height:H-640}).png().toBuffer();

// CABECA da v12 aprovada, sem nenhum filtro
const cabeca=await sharp('flow/v12-FINAL.png').extract({left:0,top:0,width:W,height:720}).png().toBuffer();

await sharp(bg).composite([
  {input:corpo,left:0,top:640},
  {input:cabeca,left:0,top:0}
]).png().toFile('flow/v15-FINAL.png');

// verifica textura do cabelo e cor do fundo
const v=await sharp('flow/v15-FINAL.png').raw().toBuffer({resolveWithObject:true});
const px=(x,y)=>{const i=(y*W+x)*v.info.channels;return v.data[i]+','+v.data[i+1]+','+v.data[i+2];};
console.log('cantos:',px(20,20),px(1900,20),px(20,1060),px(1900,1060));
console.log('cabelo (960,120):',px(960,120),'| sobrancelha (880,300):',px(880,300));
