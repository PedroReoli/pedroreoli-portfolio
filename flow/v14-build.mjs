import sharp from 'sharp';
const W=1920,H=1080,CX=959,CY=406,D=745;

// 1) normaliza o fundo do busto para #060a0e exato (nao toca no sujeito)
const {data,info}=await sharp('flow/v14-1920.png').raw().toBuffer({resolveWithObject:true});
const ch=info.channels;
const out=Buffer.from(data);
for(let i=0;i<W*H;i++){
  const p=i*ch;
  const r=data[p],g=data[p+1],b=data[p+2];
  const lum=(r+g+b)/3;
  const isYellow = r>175&&g>125&&g<240&&b<105;
  // so o fundo escuro neutro vira 6,10,14 (marmore e claro, amarelo e amarelo)
  if(!isYellow && lum<30 && Math.abs(r-g)<8 && Math.abs(g-b)<10){
    out[p]=6; out[p+1]=10; out[p+2]=14;
  }
}
await sharp(out,{raw:{width:W,height:H,channels:ch}}).png().toFile('flow/v14-FINAL.png');

// verifica
const v=await sharp('flow/v14-FINAL.png').raw().toBuffer({resolveWithObject:true});
const px=(x,y)=>{const i=(y*W+x)*v.info.channels;return v.data[i]+','+v.data[i+1]+','+v.data[i+2];};
console.log('cantos:',px(20,20),px(1900,20),px(20,1060),px(1900,1060));
let a=-1,b=-1;
for(let x=0;x<W;x++){const i=(406*W+x)*v.info.channels;const r=v.data[i],g=v.data[i+1],bb=v.data[i+2];if(r>175&&g>125&&g<240&&bb<105){if(a<0)a=x;b=x;}}
console.log('circulo d:',b-a+1,'centro',Math.round((a+b)/2));
// topo da cabeca
const linha=new Array(H).fill(0);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const i=(y*W+x)*v.info.channels;const r=v.data[i],g=v.data[i+1],bb=v.data[i+2];
  const isBg=(Math.abs(r-6)<=2&&Math.abs(g-10)<=2&&Math.abs(bb-14)<=2);
  const isY=(r>175&&g>125&&g<240&&bb<105);
  if(!isBg&&!isY) linha[y]++;
}
const mx=Math.max(...linha),lim=mx*0.15;
let t=0,bs=H-1;
for(let y=0;y<H;y++){if(linha[y]>=lim){t=y;break;}}
for(let y=H-1;y>=0;y--){if(linha[y]>=lim){bs=y;break;}}
console.log('sujeito topo',t,'base',bs,'altura',bs-t);
