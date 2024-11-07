// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    const header = document.getElementById('header');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
}

// Define healthy ranges
const HEALTHY_SPO2_MIN = 94; // Minimum SpO₂ level considered normal
const HEALTHY_BPM_MIN = 60;  // Minimum BPM level considered normal
const HEALTHY_BPM_MAX = 100; // Maximum BPM level considered normal

// Function to fetch and display data from Blynk virtual pins
function fetchAndDisplayData() {
    const spo2Url = `https://blynk.cloud/external/api/get?token=${blynkAuth}&pin=V4`; // SpO₂ on V4
    const bpmUrl = `https://blynk.cloud/external/api/get?token=${blynkAuth}&pin=V3`;  // BPM on V3

    fetch(spo2Url)
        .then(response => response.text())
        .then(data => {
            const spo2 = parseInt(data, 10);
            const spo2Text = spo2 >= HEALTHY_SPO2_MIN ? `${spo2}% - Normal` : `${spo2}% - Not Normal`;
            document.getElementById("heart-rate").textContent = spo2Text;
            updateChart(oxygenChart, spo2);
        });

    fetch(bpmUrl)
        .then(response => response.text())
        .then(data => {
            const bpm = parseInt(data, 10);
            const bpmText = (bpm >= HEALTHY_BPM_MIN && bpm <= HEALTHY_BPM_MAX) ? `${bpm} BPM - Normal` : `${bpm} BPM - Not Normal`;
            document.getElementById("blood-pressure").textContent = bpmText;
            updateChart(heartRateChart, bpm);
        });
}

// Chart.js for interactive charts
const oxygenChart = new Chart(document.getElementById('oxygenChart'), {
    type: 'line',
    data: {
        labels: ['10:00', '10:30', '11:00', '11:30', '12:00'],
        datasets: [{
            label: 'Oxygen Level (%)',
            data: [95, 94, 93, 92, 91],
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#4CAF50',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 85,
                suggestedMax: 100
            }
        }
    }
});

const heartRateChart = new Chart(document.getElementById('heartRateChart'), {
    type: 'line',
    data: {
        labels: ['10:00', '10:30', '11:00', '11:30', '12:00'],
        datasets: [{
            label: 'Heart Rate (BPM)',
            data: [70, 75, 72, 78, 80],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#FF6384',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 60,
                suggestedMax: 100
            }
        }
    }
});

// Function to update chart with real-time data
function updateChart(chart, data) {
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(data);
    if (chart.data.labels.length > 10) chart.data.labels.shift();
    if (chart.data.datasets[0].data.length > 10) chart.data.datasets[0].data.shift();
    chart.update();
}

// Update every second
setInterval(fetchAndDisplayData, 1000);
