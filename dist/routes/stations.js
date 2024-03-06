import express from 'express';
import * as irishRailApiService from '../services/irishRailApiService.js';
const router = express.Router();
// Fetch and return all station data
router.get('/', async (req, res) => {
    try {
        const stations = await irishRailApiService.getAllStations();
        res.json(stations);
    }
    catch (error) {
        console.error('Error fetching stations:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Get specific station data by name
router.get('/by-name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const station = await irishRailApiService.getStationByName(name);
        if (station) {
            res.json(station);
        }
        else {
            res.status(404).send('Station not found');
        }
    }
    catch (error) {
        console.error('Error fetching station by name:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Filter stations by latitude
router.get('/by-latitude/:minLatitude', async (req, res) => {
    try {
        const { minLatitude } = req.params;
        const stations = await irishRailApiService.filterStationsByLatitude(parseFloat(minLatitude));
        res.json(stations);
    }
    catch (error) {
        console.error('Error filtering stations by latitude:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Filter stations by proximity
router.get('/by-proximity', async (req, res) => {
    try {
        const { latitude, longitude, maxDistanceKm } = req.query;
        const stations = await irishRailApiService.filterStationsByProximity(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistanceKm));
        res.json(stations);
    }
    catch (error) {
        console.error('Error filtering stations by proximity:', error);
        res.status(500).send('Internal Server Error');
    }
});
export default router;
