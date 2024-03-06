import express, { Request, Response } from 'express';
import stationRoutes from './routes/stations.js'; 

const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/stations', stationRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
