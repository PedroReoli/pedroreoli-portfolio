import sharp from 'sharp';
import { execFileSync } from 'child_process';
const FF='node_modules/ffmpeg-static/ffmpeg.exe';
const W=1920,H=1080;
const clips=[
 ['01','hero-to-about'],
 ['02','about-to-projects'],
 ['03','projects-to-stack'],
 ['04','stack-to-purpose'],
 ['05','purpose-to-experience'],
 ['06','experience-loop'],
];

// extrai frames de fronteira
const fs=await import('fs');
fs.mkdirSync('flow/fronteiras',{recursive:true});
for(const [n] of clips){
  const src=fs.readdirSync('public/media/backdrop').find(f=>f.startsWith(n)&&f.endsWith('.mp4'));
  execFileSync(FF,['-y','-v','error','-i','public/media/backdrop/'+src,'-frames:v','1','flow/fronteiras/'+n+'-ini.png']);
  execFileSync(FF,['-y','-v','error','-sseof','-0.10','-i','public/media/backdrop/'+src,'-frames:v','1','flow/fronteiras/'+n+'-fim.png']);
}

// metricas com limiares DECLARADOS
const LIM_THRESH=8;       // |delta| medio por canal que considero "visivel"
const carregar=async f=>{
  const r=await sharp(f).resize(W,H,{fit:'fill'}).raw().toBuffer({resolveWithObject:true});
  return r.data;
};
const medir=async(a,b)=>{
  const A=await carregar(a), B=await carregar(b);
  let mae=0, maxd=0, acima=0;
  const P=W*H;
  for(let p=0;p<P;p++){
    let s=0;
    for(let c=0;c<3;c++){ const d=Math.abs(A[p*3+c]-B[p*3+c]); s+=d; if(d>maxd)maxd=d; }
    const m=s/3; mae+=m;
    if(m>LIM_THRESH) acima++;
  }
  return {mae:mae/P, maxd, pct:100*acima/P};
};

console.log('LIMIAR DECLARADO: pixel "divergente" = |delta| medio por canal > '+LIM_THRESH);
console.log('');
console.log('fronteira            MAE    maxD   %divergente');
let soma=0;
for(let i=0;i<5;i++){
  const [na,ia]=clips[i], [nb,ib]=clips[i+1];
  const m=await medir('flow/fronteiras/'+na+'-fim.png','flow/fronteiras/'+nb+'-ini.png');
  console.log((ia+' -> '+ib).padEnd(34), m.mae.toFixed(2).padStart(6), m.maxd.toString().padStart(5), m.pct.toFixed(2).padStart(8)+'%');
  soma+=m.mae;
}
console.log('');
console.log('5 fronteiras adjacentes; MAE media',(soma/5).toFixed(2));
console.log('NAO existe fronteira 6->1: sistema e scroll reversivel (FilmSlide.tsx).');
