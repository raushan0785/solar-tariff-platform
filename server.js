const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

const tariffData = {
    currentRate: 0.12,
    upcomingRates: [
        { time: '12:00 PM - 3:00 PM', rate: 0.15 },
        { time: '3:00 PM - 6:00 PM', rate: 0.20 }
    ]
};

const energyData = {
    consumption: 450,  // kWh consumed this month
    solarProduction: 320  // kWh produced this month
};

// Tariff data endpoint
app.get('/api/tariff', (req, res) => {
    res.json(tariffData);
});

// Energy data endpoint
app.get('/api/energy', (req, res) => {
    res.json(energyData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
