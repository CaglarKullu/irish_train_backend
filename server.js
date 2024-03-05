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

const xmlUrl = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML';

let stationParser = null;

// Pre-fetch and parse the station data at server startup
fetchAndParseXML(xmlUrl).then(parsedData => {
    stationParser = new StationParser(parsedData);
}).catch(console.error);

app.get('/stations/by-name/:name', async (req, res) => {
  if (!stationParser) {
      return res.status(503).send('Station data is not ready yet');
  }

  const { name } = req.params;
  const station = stationParser.findStationByName(name);
  res.json(station || {});
});

app.get('/stations/by-latitude/:minLatitude', (req, res) => {
  if (!stationParser) {
      return res.status(503).send('Station data is not ready yet');
  }

  const { minLatitude } = req.params;
  const stations = stationParser.filterStationsByLatitude(parseFloat(minLatitude));
  res.json(stations);
});

app.get('/stations/with-ids/:id', (req, res) => {
  if (!stationParser) {
      return res.status(503).send('Station data is not ready yet');
  }

  const stationsWithIds = stationParser.listStationsWithIDs();
  res.json(stationsWithIds);
});

app.get('/stations/by-latitude-range', (req, res) => {
  if (!stationParser) {
      return res.status(503).send('Station data is not ready yet');
  }

  const { minLatitude, maxLatitude } = req.query;
  const stations = stationParser.findStationsWithinLatitudeRange(parseFloat(minLatitude), parseFloat(maxLatitude));
  res.json(stations);
});

app.get('/stations/by-proximity', (req, res) => {
  if (!stationParser) {
      return res.status(503).send('Station data is not ready yet');
  }

  const { latitude, longitude, maxDistanceKm } = req.query;
  const stations = stationParser.filterStationsByProximity(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistanceKm));
  res.json(stations);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
