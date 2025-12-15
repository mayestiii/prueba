const { FalabellaScraperService } = require('./src/modules/scraping/falabella-scraper.service');
const fs = require('fs');
const path = require('path');

// Nota: Este script requiere que el código esté compilado
// O puedes usar ts-node para ejecutarlo directamente

async function testScraper() {
  console.log('🧪 Probando scraper de Falabella\n');
  
  // Opción 1: Probar con el HTML guardado
  const htmlFile = path.join(__dirname, 'ejem-falabella.html');
  
  if (fs.existsSync(htmlFile)) {
    console.log('📄 Usando HTML guardado:', htmlFile);
    
    const scraper = new FalabellaScraperService();
    const products = await scraper.parseSavedHTML(htmlFile);
    
    console.log(`\n✅ Encontrados ${products.length} productos:\n`);
    
    products.slice(0, 10).forEach((product, index) => {
      console.log(`${index + 1}. ${product.formattedMessage}`);
    });
    
    if (products.length > 10) {
      console.log(`\n... y ${products.length - 10} productos más`);
    }
  } else {
    console.log('⚠️  Archivo HTML no encontrado. Probando descarga...');
    
    const scraper = new FalabellaScraperService();
    const url = 'https://www.falabella.com/falabella-cl/category/cat20002/Ofertas';
    
    try {
      const products = await scraper.scrape(url);
      
      console.log(`\n✅ Encontrados ${products.length} productos:\n`);
      
      products.slice(0, 10).forEach((product, index) => {
        console.log(`${index + 1}. ${product.formattedMessage}`);
      });
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testScraper().catch(console.error);
}

module.exports = { testScraper };
