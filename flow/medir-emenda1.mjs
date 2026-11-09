import sharp from 'sharp';
const W=1920,H=1080;
const A='public/media/backdrop/01-hero-poster.png'; // busto clas. producao
const B='flow/v12-FINAL.png';                        // intermediaria aprovada

// ---- CIRCULO: centro e raio por deteccao do amarelo exato ----
async function circulo(f){
  const {data,info}=await sharp(f).resize(W,H,{fit:'fill'}).raw().toBuffer({resolveWithObject:true});
  const ch=info.channels;
  let minX=1e9,maxX=-1,minY=1e9,maxY=-1,n=0,sx=0,sy=0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const i=(y*W+x)*ch; const r=data[i],g=data[i+1],b=data[i+2];
    if(r>200&&g>150&&g<230&&b<80){
      if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y;
      n++; sx+=x; sy+=y;
    }
  }
  return {cx:(minX+maxX)/2, cy:(minY+maxY)/2, d:((maxX-minX)+(maxY-minY))/2,
          n, cxm:sx/n, cym:sy/n};
}

// ---- LANDMARKS faciais: olhos/nariz/queixo por perfis de intensidade ----
// metodo: na faixa da cabeca, localiza o par de manchas escuras das pupilas
async function landmarks(f){
  const {data,info}=await sharp(f).resize(W,H,{fit:'fill'}).greyscale().raw().toBuffer({resolveWithObject:true});
  // procura linhas com dois minimos escuros separados = olhos
  const score=[];
  for(let y=200;y<700;y++){
    let curtos=0, prevDark=false, grupos=[];
    for(let x=560;x<1360;x++){
      const v=data[y*W+x];
      const dark=v<70;
      if(dark&&!prevDark){ grupos.push(x); }
      prevDark=dark;
    }
    if(grupos.length>=2) score.push({y, g:grupos.length, x0:grupos[0], x1:grupos[grupos.length-1]});
  }
  // linha dos olhos = mediana das linhas com exatamente 2 grupos
  const dois=score.filter(s=>s.g===2);
  const yOlhos= dois.length? dois[Math.floor(dois.length/2)].y : null;
  return {yOlhos, nLinhas: score.length};
}

const ca=await circulo(A), cb=await circulo(B);
console.log('=== CIRCULO ===');
console.log('busto producao: cx',ca.cx.toFixed(1),'cy',ca.cy.toFixed(1),'d',ca.d.toFixed(1),'| amarelos',ca.n);
console.log('v12 aprovada  : cx',cb.cx.toFixed(1),'cy',cb.cy.toFixed(1),'d',cb.d.toFixed(1),'| amarelos',cb.n);
console.log('DELTA         : dCX',(cb.cx-ca.cx).toFixed(1),'dCY',(cb.cy-ca.cy).toFixed(1),'dRaio',((cb.d-ca.d)/2).toFixed(1));

const la=await landmarks(A), lb=await landmarks(B);
console.log('=== LINHA DOS OLHOS (deteccao automatica) ===');
console.log('busto producao: y',la.yOlhos);
console.log('v12 aprovada  : y',lb.yOlhos);
