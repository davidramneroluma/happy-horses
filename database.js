const fs = require('fs').promises;

async function getHorses() {
  try {
    const data = await fs.readFile('./data/data.json', 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.horses;
  } catch (err) {
    console.error(`Error reading or parsing horses data: ${err}`);
    return [];
  }
}

module.exports = { getHorses };
