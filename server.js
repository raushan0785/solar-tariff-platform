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
// Add this to server.js

const recommendations = {
    recommendation: "Run appliances between 12:00 PM - 3:00 PM for lower rates.",
    alert: "Warning: High tariffs expected from 3:00 PM - 6:00 PM!"
};

// API to get energy recommendations
app.get('/api/recommendation', (req, res) => {
    res.json(recommendations);
});
const getApplianceSchedule = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Recommended time: Now!";
    else if (currentHour < 15) return "Recommended time: 12:00 PM - 3:00 PM.";
    else return "Avoid using appliances until 6:00 PM.";
};

app.get('/api/schedule', (req, res) => {
    res.json({ schedule: getApplianceSchedule() });
});
// Handle appliance usage simulation
app.post('/api/appliance', express.json(), (req, res) => {
    const { appliance, status } = req.body;
    console.log(`${appliance} is now ${status ? 'ON' : 'OFF'}`);
    res.json({ message: `${appliance} status updated` });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});