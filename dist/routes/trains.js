import express from 'express';
import * as irishRailApiService from '../services/irishRailApiService';
const router = express.Router();
router.get('/current', async (req, res) => {
    try {
        const currentTrains = await irishRailApiService.getCurrentTrains();
        res.json(currentTrains);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
export default router;
