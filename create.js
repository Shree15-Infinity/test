// Toggle visibility for the new password field
function toggleNewPassword() {
    const passwordField = document.getElementById('newPassword');
    const passwordType = passwordField.getAttribute('type');
    passwordField.setAttribute('type', passwordType === 'password' ? 'text' : 'password');
}

// Toggle visibility for the confirm password field
function toggleConfirmPassword() {
    const passwordField = document.getElementById('confirmPassword');
    const passwordType = passwordField.getAttribute('type');
    passwordField.setAttribute('type', passwordType === 'password' ? 'text' : 'password');
}

// Form submission with validation
document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Simulate successful account creation
    alert('Account created successfully!');
});
