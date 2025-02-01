const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(__dirname, 'files', 'example.txt');

  try {
    // Dosyayı binary modda okuyun
    const data = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream', // veya dosyanın tipi neyse onu belirtin
        'Content-Disposition': 'attachment; filename="example.txt"',
      },
      // Binary veriyi base64'e çevirin
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
