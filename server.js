const express = require('express');
const app = express();
const port = 3000;

// Dummy tariff data
const tariffData = {
    currentRate: 0.12, // $/kWh
    upcomingRates: [
        { time: '12:00 PM - 3:00 PM', rate: 0.15 },
        { time: '3:00 PM - 6:00 PM', rate: 0.20 },
    ]
};

// API endpoint to get tariff data
app.get('/tariff', (req, res) => {
    res.json(tariffData);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
