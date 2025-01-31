const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(process.cwd(), 'static/files/example.txt'); // Dosya yolunu belirtin
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: JSON.stringify({ content: data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Dosya okunamadı' }),
    };
  }
};
