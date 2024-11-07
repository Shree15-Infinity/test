// script.js

// Function to generate a unique user ID
function generateUniqueId() {
    return 'USER-' + Math.floor(100000 + Math.random() * 900000);
}

// Simulate sending the generated ID via email
function sendEmail(email, uniqueId) {
    alert(`An email has been sent to ${email} with your Unique ID: ${uniqueId}`);
}

// Handle account creation and ID generation
function createAccount() {
    const email = document.getElementById('email').value;

    if (validateEmail(email)) {
        const uniqueId = generateUniqueId();
        sendEmail(email, uniqueId);  // Simulate sending email
    } else {
        alert('Please enter a valid email address.');
    }
}

// Email validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
