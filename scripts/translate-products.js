const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, '..', 'data', 'products.json');
const enPath = path.join(__dirname, '..', 'data', 'locales', 'en', 'products.json');
const zhLocalesPath = path.join(__dirname, '..', 'data', 'locales', 'zh', 'products.json');

// Copy original to zh
fs.copyFileSync(zhPath, zhLocalesPath);

const products = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

const dict = {
  "天丝": "Tencel",
  "涤纶": "Polyester",
  "氨纶": "Spandex",
  "聚酯纤维": "Polyester Fiber",
  "人棉": "Rayon",
  "棉": "Cotton",
  "亚麻": "Linen",
  "锦纶": "Nylon",
  "苎麻": "Ramie",
  "醋酸": "Acetate",
  "面料": "Fabric",
  "乐丽丝": "Lelise",
  "仿牛仔": "Faux Denim",
  "绣花印花底布": "Embroidery Base",
  "棉布": "Cotton Fabric",
  "色": " colors",
  "克": "g",
  "曲": "Curved ",
  "仙女条": "Fairy Stripe",
  "涤": "Poly",
  "竹节": "Slub",
  "皱": "Crepe",
  "洗水": "Washed ",
  "加厚": "Thick ",
  "砂洗": "Sand Washed "
};

function translateText(text) {
  if (!text) return text;
  let translated = text;
  for (const [zh, en] of Object.entries(dict)) {
    translated = translated.split(zh).join(en);
  }
  return translated;
}

const enProducts = products.map(p => {
  return {
    ...p,
    name: translateText(p.name),
    fullname: translateText(p.fullname),
    description: translateText(p.description),
    category: translateText(p.category),
    type: translateText(p.type),
    content: p.content.map(c => ({
      ...c,
      name: translateText(c.name)
    })),
    keywords: p.keywords.map(k => translateText(k))
  };
});

fs.writeFileSync(enPath, JSON.stringify(enProducts, null, 4), 'utf8');
console.log('Translated products.json generated at', enPath);