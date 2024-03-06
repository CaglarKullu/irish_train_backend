import express, { Request, Response } from 'express';
import * as irishRailApiService from '../services/irishRailApiService';

const router = express.Router();

router.get('/current', async (req: Request, res: Response) => {
  try {
    const currentTrains = await irishRailApiService.getCurrentTrains();
    res.json(currentTrains);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
