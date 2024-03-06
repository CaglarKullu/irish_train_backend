import express, { Request, Response } from 'express';
import { fetchAndParseXML } from './utils/fetchAndParseXML.js';
import { StationParser } from './models/StationParser.js'; 
import stationRoutes from './routes/stations.js'; 

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
const apiUrl = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML'; 


// app.get('/stations', async (req: Request, res: Response) => {

//   try {
//     console.log('Fetching station data...');
//     const jsonData = await fetchAndParseXML(apiUrl);
//     const stationParser = new StationParser(jsonData);
//     res.json(stationParser.getAllStations());
//   } catch (error) {
//     console.error('Failed to fetch station data:', error);
//     res.status(500).send('Failed to fetch station data');
//   }
// });

// let stationParser: StationParser | null = null;

// // Pre-fetch and parse the station data at server startup
// fetchAndParseXML(apiUrl).then(parsedData => {
//     stationParser = new StationParser(parsedData);
// }).catch(console.error);

// app.get('/stations/by-name/:name', async (req: Request, res: Response) => {
//   if (!stationParser) {
//       return res.status(503).send('Station data is not ready yet');
//   }

//   const { name } = req.params;
//   const station = stationParser.findStationByName(name);
//   res.json(station || {});
  
// });
app.use('/stations', stationRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
