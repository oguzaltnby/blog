const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Fonksiyon dosyasının bulunduğu dizinden 'files' klasörüne gidiyoruz.
  const filesDir = path.join(__dirname, 'files');

  try {
    // Klasördeki tüm dosyaların adlarını alıyoruz
    const files = fs.readdirSync(filesDir);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ files })
    };
  } catch (error) {
    console.error('Dosya listesi okunamadı:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dosya listesi alınamadı', detay: error.message }),
    };
  }
};
