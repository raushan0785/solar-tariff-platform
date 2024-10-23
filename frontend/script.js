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
// Store the state of running appliances
let runningAppliances = [];

// Toggle appliance on/off and update the display
function toggleAppliance(appliance) {
    const index = runningAppliances.indexOf(appliance);

    if (index === -1) {
        // Turn appliance on
        runningAppliances.push(appliance);
    } else {
        // Turn appliance off
        runningAppliances.splice(index, 1);
    }
    updateApplianceStatus();
}

// Update the status display
function updateApplianceStatus() {
    const statusDiv = document.getElementById('appliance-status');
    if (runningAppliances.length === 0) {
        statusDiv.innerHTML = `<p>No appliances running.</p>`;
    } else {
        statusDiv.innerHTML = `<p>Running: ${runningAppliances.join(', ')}</p>`;
    }
}
// Send appliance status to the backend
function sendApplianceStatus(appliance, status) {
    fetch('http://localhost:3000/api/appliance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appliance, status })
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error updating appliance status:', error));
}

// Modify toggle function to include backend communication
function toggleAppliance(appliance) {
    const index = runningAppliances.indexOf(appliance);

    let status;
    if (index === -1) {
        runningAppliances.push(appliance);
        status = true;  // Appliance turned ON
    } else {
        runningAppliances.splice(index, 1);
        status = false; // Appliance turned OFF
    }
    updateApplianceStatus();
    sendApplianceStatus(appliance, status);  // Send status to backend
}
function toggleAppliance(appliance) {
    const button = document.querySelector(`button[onclick="toggleAppliance('${appliance}')"]`);
    button.disabled = true;  // Disable button during API call

    const index = runningAppliances.indexOf(appliance);
    let status = (index === -1);

    if (status) {
        runningAppliances.push(appliance);
    } else {
        runningAppliances.splice(index, 1);
    }

    updateApplianceStatus();
    sendApplianceStatus(appliance, status).finally(() => {
        button.disabled = false;  // Re-enable button after call completes
    });
}


// Fetch all data when the page loads
window.onload = function () {
    fetchTariffData();
    fetchEnergyData();
    fetchRecommendations();
    fetchApplianceSchedule(); // New function call
};






