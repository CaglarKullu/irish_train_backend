import express from 'express';
import stationRoutes from './routes/stations.js';
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Station Routes
// Adjust the path as needed based on how you want to structure your API endpoints.
app.use('/api/stations', stationRoutes);
// Default route for handling unmatched routes or a simple home route
app.get('/', (req, res) => {
    res.send('Welcome to the Irish Rail API Wrapper');
});
// Catch-all for 404 Not Found responses
// Useful for indicating an endpoint doesn't exist
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});
export default app;
