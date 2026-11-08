import sharp from 'sharp';

const W=1920, H=1080, CX=959, CY=406, D=745;

// 1) CAMADA FUNDO: retangulo #060a0e + circulo amarelo 745px  (100% deterministica)
const bgSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#060a0e"/>
  <circle cx="${CX}" cy="${CY}" r="${D/2}" fill="#ffc900"/>
</svg>`);

// 2) SUJEITO: recorta do marmore gerado (rosto do Pedro intacto)
const SRC='flow/v9-fixed.jpg';
const m = await sharp(SRC).metadata();
console.log('origem', m.width+'x'+m.height);

// recorte apertado no sujeito (cabelo no topo, busto ate a base)
const crop = { left: 330, top: 130, width: 1120, height: 1918 };
const meta = await sharp(SRC).extract(crop).metadata();

// escala: topo do cabelo em y=61, altura util ate o fim do frame (1019)
const top = 61, altura = H - top;
const esc = await sharp(SRC).extract(crop).resize(null, altura, { fit:'inside' }).toBuffer();
const em = await sharp(esc).metadata();
console.log('sujeito escalado', em.width+'x'+em.height);

// 3) mascara: o fundo da foto (cinza escuro ~ #202020) vira transparente;
//    marmore, camisa preta e cabelo permanecem. Uso limiar por luminancia
//    mas preservo o corpo abaixo do queixo (camisa escura) como opaco.
const masc = await sharp(esc).greyscale().raw().toBuffer({ resolveWithObject:true });
const alfa = Buffer.alloc(em.width*em.height, 255);
const queixo = Math.round(em.height * 0.50);
for (let y=0; y<em.height; y++){
  for (let x=0; x<em.width; x++){
    const idx = y*em.width + x;
    const lum = masc.data[idx];
    if (y > queixo) { alfa[idx] = 255; continue; }        // corpo/camisa: opaco
    alfa[idx] = Math.min(255, Math.max(0, Math.round((lum - 34) * 6)));
  }
}

const sujeitoRGBA = await sharp(esc).ensureAlpha().joinChannel(alfa, { raw: { width: em.width, height: em.height, channels: 1 } }).png().toBuffer();

// 4) composicao: fundo + sujeito centralizado
const offX = Math.round(CX - em.width/2);
const out = await sharp(bgSvg).composite([{ input: sujeitoRGBA, left: offX, top }]).jpeg({ quality:94 }).toBuffer();
await sharp(out).toFile('flow/v9-FINAL.jpg');
console.log('montado', W+'x'+H, 'circulo', D, 'centro', CX+','+CY, 'offsetX', offX);
