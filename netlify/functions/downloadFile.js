const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Sorgu parametrelerinden filename bilgisini alıyoruz.
  const { filename } = event.queryStringParameters || {};

  if (!filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Dosya ismi belirtilmedi' }),
    };
  }

  // Dosya yolunu oluşturuyoruz. (Güvenlik açısından, filename üzerinde ekstra kontroller yapmanız önerilir!)
  const filePath = path.join(__dirname, 'files', filename);

  try {
    // Dosyayı binary modda okuyoruz.
    const data = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
      // Binary veriyi base64 formatında döndürüyoruz.
      body: data.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Dosya indirilemedi:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dosya indirilemedi', detay: error.message }),
    };
  }
};
