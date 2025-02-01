const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Fonksiyon dosyanızın bulunduğu dizini temel alarak 'files' adlı bir klasörde example.txt dosyasının yolunu oluşturuyoruz
  const filePath = path.join(__dirname, 'files', 'example.txt');

  try {
    // Dosyayı UTF-8 formatında okuyarak 'data' değişkenine atıyoruz
    const data = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: JSON.stringify({ content: data }),
    };
  } catch (error) {
    console.error('Dosya okunamadı:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dosya okunamadı' }),
    };
  }
};
