document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const emailInput = document.getElementById('email').value;
    const notification = document.getElementById('notification');

    if (validateEmail(emailInput)) {
        // Simulate sending email (you would replace this with actual backend call)
        notification.textContent = 'Password reset link has been sent to your email.';
        notification.style.display = 'block';
        notification.style.color = 'green';
    } else {
        // Show error if the email is invalid
        notification.textContent = 'Please enter a valid email address.';
        notification.style.display = 'block';
        notification.style.color = 'red';
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
