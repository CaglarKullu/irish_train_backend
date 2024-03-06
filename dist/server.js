import express from 'express';
import { fetchAndParseXML } from './utils/fetchAndParseXML.js';
import { StationParser } from './models/StationParser.js';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const apiUrl = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML';
app.get('/stations', async (req, res) => {
    try {
        console.log('Fetching station data...');
        const jsonData = await fetchAndParseXML(apiUrl);
        const stationParser = new StationParser(jsonData);
        res.json(stationParser.getAllStations());
    }
    catch (error) {
        console.error('Failed to fetch station data:', error);
        res.status(500).send('Failed to fetch station data');
    }
});
let stationParser = null;
// Pre-fetch and parse the station data at server startup
fetchAndParseXML(apiUrl).then(parsedData => {
    stationParser = new StationParser(parsedData);
}).catch(console.error);
app.get('/stations/by-name/:name', async (req, res) => {
    if (!stationParser) {
        return res.status(503).send('Station data is not ready yet');
    }
    const { name } = req.params;
    const station = stationParser.findStationByName(name);
    res.json(station || {});
    // And so on for other routes...
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
