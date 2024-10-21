// Fetch and display tariff data
function fetchTariffData() {
    fetch('http://localhost:3000/api/tariff')
        .then(response => response.json())
        .then(data => displayTariffData(data))
        .catch(error => console.error('Error fetching tariff data:', error));
}

// Fetch and display energy data
function fetchEnergyData() {
    fetch('http://localhost:3000/api/energy')
        .then(response => response.json())
        .then(data => displayEnergyData(data))
        .catch(error => console.error('Error fetching energy data:', error));
}

// Display the tariff data on the page
function displayTariffData(data) {
    const tariffInfo = document.getElementById('tariff-info');
    tariffInfo.innerHTML = `
        <p>Current Rate: $${data.currentRate}/kWh</p>
        <h3>Upcoming Rates:</h3>
        <ul>
            ${data.upcomingRates.map(rate => `<li>${rate.time}: $${rate.rate}/kWh</li>`).join('')}
        </ul>
    `;
}

// Display the energy data on the page
function displayEnergyData(data) {
    const energyInfo = document.getElementById('energy-info');
    energyInfo.innerHTML = `
        <p>Monthly Consumption: ${data.consumption} kWh</p>
        <p>Solar Production: ${data.solarProduction} kWh</p>
    `;
}
// Fetch and display recommendations and alerts
function fetchRecommendations() {
    fetch('http://localhost:3000/api/recommendation')
        .then(response => response.json())
        .then(data => displayRecommendation(data))
        .catch(error => console.error('Error fetching recommendations:', error));
}

// Display the recommendation and alert on the page
function displayRecommendation(data) {
    const alertInfo = document.getElementById('alert-info');
    alertInfo.innerHTML = `
        <p><strong>Recommendation:</strong> ${data.recommendation}</p>
        <p class="alert"><strong>Alert:</strong> ${data.alert}</p>
    `;
}
// Fetch and display smart appliance schedule
function fetchApplianceSchedule() {
    fetch('http://localhost:3000/api/schedule')
        .then(response => response.json())
        .then(data => displayApplianceSchedule(data))
        .catch(error => console.error('Error fetching appliance schedule:', error));
}

// Display the fetched schedule in the UI
function displayApplianceSchedule(data) {
    const scheduleInfo = document.getElementById('schedule-info');
    scheduleInfo.innerHTML = `
        <p><strong>Smart Schedule:</strong> ${data.schedule}</p>
    `;
}

// Fetch all data when the page loads
window.onload = function () {
    fetchTariffData();
    fetchEnergyData();
    fetchRecommendations();
    fetchApplianceSchedule(); // New function call
};






