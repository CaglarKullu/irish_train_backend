const axios = require('axios');
const xml2js = require('xml2js');

async function fetchAndParseXML(url) {
  try {
    const response = await axios.get(url);
    const xmlData = response.data;
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);
    return result; // This is the JSON object
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
}

module.exports = { fetchAndParseXML };
