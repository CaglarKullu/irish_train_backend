import express, { Request, Response } from 'express';
import { getAllStations } from '../services/irishRailApiService';
import { StationType } from '../services/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const type = req.query.type as StationType | undefined;

    if (type && !Object.values(StationType).includes(type)) {
      return res.status(400).send('Invalid station type');
    }

    const stations = await getAllStations(type);
    res.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).send('Error fetching station data');
  }
});

export default router;
