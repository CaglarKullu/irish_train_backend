const express = require('express');
const stationRoutes = require('./routes/stations');
const trainRoutes = require('./routes/trains');

const app = express();
const port = 3000;

app.use('/stations', stationRoutes);
app.use('/trains', trainRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
