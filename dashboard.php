<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Monitoring Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="dashboard.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <h2>Dashboard</h2>
        <ul>
            <li><i class="fas fa-home"></i> <span>Dashboard</span></li>
            <li><i class="fas fa-heartbeat"></i> <span>Patient Monitoring</span></li>
            <li><i class="fas fa-lungs"></i> <span>Oxygen Levels</span></li>
            <li><i class="fas fa-file-alt"></i> <span>Reports/History</span></li>
        </ul>
        <div class="sidebar-toggle" onclick="toggleSidebar()">
            <i class="fas fa-angle-left"></i>
        </div>
    </div>

    <!-- Header -->
    <header id="header">
        <div class="logo">Health Monitoring</div>
        <nav>
            <a href="profile.html">Profile</a>
            <a href="#">Settings</a>
            <a href="index.html" aria-label="Home"><i class="fas fa-bell"></i></a>
            <a href="index.html" class="cta-btn">Log Out</a>
        </nav>
        <input type="text" placeholder="Search records...">
    </header>

    <!-- Main Dashboard -->
    <div class="main" id="main">
        <!-- Overview Cards -->
        <div class="overview-cards">
            <div class="card">
                <i class="fas fa-lungs"></i>
                <h3>Oxygen Level</h3>
                <p id="oxygen-level">95% - Normal</p>
            </div>
            <div class="card">
                <i class="fas fa-heartbeat"></i>
                <h3>Heart Rate (SpO₂)</h3>
                <p id="heart-rate">Loading...</p>
            </div>
            <div class="card">
                <i class="fas fa-tint"></i>
                <h3>Blood Pressure (BPM)</h3>
                <p id="blood-pressure">Loading...</p>
            </div>
            <div class="card">
                <i class="fas fa-temperature-high"></i>
                <h3>Temperature</h3>
                <p>37°C - Normal</p>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart">
                <canvas id="oxygenChart"></canvas>
            </div>
            <div class="chart">
                <canvas id="heartRateChart"></canvas>
            </div>
        </div>

        <!-- Notifications Section -->
        <div class="notifications">
            <h3>Recent Notifications</h3>
            <div class="notification">
                <p>Low Oxygen Levels Detected</p>
                <small>3 minutes ago</small>
            </div>
            <div class="notification">
                <p>Heart Rate Exceeded Safe Limit</p>
                <small>10 minutes ago</small>
            </div>
        </div>
    </div>

    <!-- JavaScript to fetch and display data in real-time -->
    <script>
        // Blynk Auth Token
        const blynkAuth = "u9wt47JXIsPqfAA7O38D71PDmSHhsJxi";

        // Function to fetch and display data from Blynk virtual pins
        function fetchAndDisplayData() {
            const spo2Url = `https://blynk.cloud/external/api/get?token=${blynkAuth}&pin=V4`; // SpO2 on V4
            const bpmUrl = `https://blynk.cloud/external/api/get?token=${blynkAuth}&pin=V3`;  // BPM on V3

            fetch(spo2Url)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("heart-rate").textContent = data ? `${data}% - Normal` : "No Data";
                    updateChart(oxygenChart, data);
                });

            fetch(bpmUrl)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("blood-pressure").textContent = data ? `${data} BPM - Normal` : "No Data";
                    updateChart(heartRateChart, data);
                });
        }

        // Chart.js Initialization
        const oxygenCtx = document.getElementById("oxygenChart").getContext("2d");
        const heartRateCtx = document.getElementById("heartRateChart").getContext("2d");

        const oxygenChart = new Chart(oxygenCtx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Oxygen Level",
                    data: [],
                    borderColor: "#4CAF50",
                    fill: false,
                }]
            },
        });

        const heartRateChart = new Chart(heartRateCtx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Heart Rate (BPM)",
                    data: [],
                    borderColor: "#FF6384",
                    fill: false,
                }]
            },
        });

        function updateChart(chart, data) {
            chart.data.labels.push(new Date().toLocaleTimeString());
            chart.data.datasets[0].data.push(data);
            if (chart.data.labels.length > 10) chart.data.labels.shift();
            if (chart.data.datasets[0].data.length > 10) chart.data.datasets[0].data.shift();
            chart.update();
        }

        setInterval(fetchAndDisplayData, 1000);
    </script>

</body>
</html>
