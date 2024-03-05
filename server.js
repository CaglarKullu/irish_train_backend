const express = require('express');
const { fetchAndParseXML } = require('./fetchStations');
const StationParser = require('./StationParser');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/stations', async (req, res) => {
  const url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML'; 
  try {
    console.log('Fetching station data...');
    const jsonData = await fetchAndParseXML(url);
    const stationParser = new StationParser(jsonData);
    res.json(stationParser.stations); // Send all stations as a response
  } catch (error) {
    res.status(500).send('Failed to fetch station data');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
