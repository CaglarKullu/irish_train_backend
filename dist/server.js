import express from 'express';
import stationRoutes from './routes/stations.js';
const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/stations', stationRoutes);
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
