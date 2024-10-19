// Fetch tariff data using AJAX
function fetchTariffData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/tariff', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayTariffData(data);
        }
    };
    xhr.send();
}

// Display the fetched tariff data
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

// Fetch tariff data when the page loads
window.onload = fetchTariffData;
