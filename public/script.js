// Fetch and display tariff data
function loadTariffData() {
    fetch('/api/usage')
        .then(response => response.json())
        .then(data => {
            document.getElementById('tariff-info').innerText =
                `Total: ${data.total} units, Peak: ${data.peak} units, Off-Peak: ${data.offPeak} units`;
        })
        .catch(error => console.error('Error loading tariff data:', error));
}

// Fetch and display energy analytics
function loadEnergyAnalytics() {
    fetch('/api/usage')
        .then(response => response.json())
        .then(data => {
            const usageDetails = `You used ${data.total} units this month. Peak usage: ${data.peak} units.`;
            document.getElementById('energy-analytics').innerText = usageDetails;
        })
        .catch(error => console.error('Error loading energy analytics:', error));
}

// Fetch and display smart scheduling info
function loadSmartSchedule() {
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
            document.getElementById('schedule-info').innerText =
                `Recommended: Run ${data.appliances.join(', ')} during ${data.recommendedTime}.`;
        })
        .catch(error => console.error('Error loading schedule:', error));
}

// Fetch and display notifications
function loadNotifications() {
    fetch('/api/notifications')
        .then(response => response.json())
        .then(data => {
            document.getElementById('notifications').innerText = data.message;
        })
        .catch(error => console.error('Error loading notifications:', error));
}

// Fetch and display cost-benefit analysis
function loadCostBenefitAnalysis() {
    fetch('/api/cost-benefit')
        .then(response => response.json())
        .then(data => {
            const analysis = `Total savings: $${data.totalSavings}. Historical savings: ${data.historicalSavings.join(', ')} dollars.`;
            document.getElementById('cost-benefit').innerText = analysis;
        })
        .catch(error => console.error('Error loading cost-benefit analysis:', error));
}

// Load all data when the page is loaded
window.onload = function() {
    loadTariffData();
    loadEnergyAnalytics();
    loadSmartSchedule();
    loadNotifications();
    loadCostBenefitAnalysis();
};
