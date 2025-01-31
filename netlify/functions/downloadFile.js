const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(process.cwd(), 'files/example.txt'); // Dosya yolunu belirtin
  console.log('Current working directory:', process.cwd());
  console.log('File path:', filePath);

  try {
    const data = fs.readFileSync(filePath);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="example.txt"',
      },
      body: data.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dosya indirilemedi' }),
    };
  }
};
