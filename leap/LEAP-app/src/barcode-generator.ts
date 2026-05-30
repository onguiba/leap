// Générateur d'images produits — vraies photos via imageUrl du produit, Open Food Facts ou fallback neutre

// Map barcode → image URL Open Food Facts (produits camerounais réels)
const OPENFOODFACTS_IMAGES: Record<string, string> = {
  '6170001000016': 'https://images.openfoodfacts.org/images/products/617/000/100/0016/front_fr.3.400.jpg',
  '6171100010018': 'https://images.openfoodfacts.org/images/products/617/110/001/0018/front_fr.3.400.jpg',
  '6170001001013': 'https://images.openfoodfacts.org/images/products/617/000/100/1013/front_fr.3.400.jpg',
  '6170001001051': 'https://images.openfoodfacts.org/images/products/617/000/100/1051/front_fr.3.400.jpg',
  '6170001002010': 'https://images.openfoodfacts.org/images/products/617/000/100/2010/front_fr.3.400.jpg',
  '6170002001012': 'https://images.openfoodfacts.org/images/products/617/000/200/1012/front_fr.3.400.jpg',
  '6173001000012': 'https://images.openfoodfacts.org/images/products/617/300/100/0012/front_fr.3.400.jpg',
  '6171200010116': 'https://images.openfoodfacts.org/images/products/617/120/001/0116/front_fr.3.400.jpg',
};

// Map catégorie → URL image locale ou générique
const CATEGORY_IMAGES: Record<string, string> = {
  'lait':       '/IMAGES/Lait Entier Frais 1L.jpg',
  'pain':       '/IMAGES/Pain Complet 500g.jpg',
  'oeufs':      '/IMAGES/Oeufs Frais x12.jpg',
  'huile':      '/IMAGES/Huile Végétale Mayor 1L.webp',
  'riz':        '/IMAGES/Riz Basmati 2kg.jpg',
  'eau':        '/IMAGES/Eau Minérale Tangui 1.5L.png',
  'biere':      '/IMAGES/Bière 33 Export 65cl.png',
  'tomates':    '/IMAGES/Tomates Fraîches 1kg.jpg',
  'maggi':      '/IMAGES/Bouillon Maggi Etoile 4g.jpg',
  'bananes':    '/IMAGES/Bananes Plantain 1kg.jpg',
  // Fallback vers OpenFoodFacts pour les images manquantes
  'eau2':       'https://images.openfoodfacts.org/images/products/617/110/001/0018/front_fr.3.400.jpg',
  'castel':     'https://images.openfoodfacts.org/images/products/617/000/100/1051/front_fr.3.400.jpg',
  'yaourt':     'https://images.openfoodfacts.org/images/products/330/011/183/4552/front_fr.167.400.jpg',
  'beurre':     'https://images.openfoodfacts.org/images/products/301/025/401/0369/front_fr.158.400.jpg',
  'sucre':      'https://images.openfoodfacts.org/images/products/320/682/006/6615/front_fr.67.400.jpg',
  'chocolat':   'https://images.openfoodfacts.org/images/products/617/140/003/0112/front_fr.3.400.jpg',
  'malta':      'https://images.openfoodfacts.org/images/products/617/000/200/1012/front_fr.3.400.jpg',
  'top':        'https://images.openfoodfacts.org/images/products/617/000/100/2010/front_fr.3.400.jpg',
  'sardines':   'https://images.openfoodfacts.org/images/products/326/004/506/5100/front_fr.157.400.jpg',
  'cafe':       'https://images.openfoodfacts.org/images/products/804/400/082/1774/front_fr.164.400.jpg',
  'the':        'https://images.openfoodfacts.org/images/products/361/024/010/5643/front_fr.120.400.jpg',
  'jus':        'https://images.openfoodfacts.org/images/products/301/055/501/3560/front_fr.229.400.jpg',
  'pates':      'https://images.openfoodfacts.org/images/products/801/200/400/1986/front_fr.146.400.jpg',
  'sauce':      'https://images.openfoodfacts.org/images/products/200/420/900/5093/front_fr.130.400.jpg',
  'savon':      'https://images.openfoodfacts.org/images/products/500/011/259/7457/front_fr.56.400.jpg',
  'detergent':  'https://images.openfoodfacts.org/images/products/500/034/020/3490/front_fr.63.400.jpg',
  'poulet':     'https://images.openfoodfacts.org/images/products/200/720/000/3790/front_fr.97.400.jpg',
  'poisson':    'https://images.openfoodfacts.org/images/products/542/024/803/5350/front_fr.99.400.jpg',
  'boeuf':      'https://images.openfoodfacts.org/images/products/200/720/000/3790/front_fr.97.400.jpg',
  'carottes':   'https://images.openfoodfacts.org/images/products/326/019/034/4015/front_fr.130.400.jpg',
};

export function generateProductCardImage(barcode: string, imageKey: string, imageUrl?: string): string {
  // 1. Utiliser l'imageUrl directement si fournie par le produit
  const url = imageUrl || OPENFOODFACTS_IMAGES[barcode] || CATEGORY_IMAGES[imageKey] || null;

  if (url) {
    return `
      <div class="product-img-wrapper">
        <img
          src="${url}"
          alt="produit"
          class="product-real-img"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=\\'product-img-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#ccc\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg></div>'"
        />
      </div>
    `;
  }

  // Fallback neutre sans emoji
  return `
    <div class="product-img-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </div>
  `;
}

export function generateBarcodeImage(barcode: string, productName: string): string {
  return `
    <div style="background:#f8fafc;border-radius:12px;padding:15px;text-align:center;border:1px solid #e2e8f0;">
      <div style="font-size:0.9rem;font-weight:600;color:#2c3e50;margin-bottom:10px;text-transform:uppercase;">${productName}</div>
      <div style="background:white;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
        <div style="font-family:'Courier New',monospace;font-size:1rem;font-weight:700;letter-spacing:3px;color:#000;">${barcode}</div>
      </div>
      <div style="display:inline-block;background:#00c471;color:white;padding:5px 12px;border-radius:20px;font-size:0.75rem;font-weight:600;margin-top:8px;">Scannable</div>
    </div>
  `;
}

export function generateCompactBarcodeImage(barcode: string): string {
  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px;text-align:center;">
      <div style="font-family:'Courier New',monospace;font-size:0.75rem;font-weight:600;color:#333;letter-spacing:1px;">${barcode}</div>
    </div>
  `;
}
