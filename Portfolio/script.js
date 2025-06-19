// Day 9: Toggle button logic
const toggleButton = document.querySelector('#toggle-button');
const welcomeMessage = document.querySelector('#welcome-message');

// My custom toggle message
const originalMessage = "Hello, I'm Shafiul Alam. Check out my responsive portfolio!";
const alternateMessage = "Welcome to my web development journey!";

if (toggleButton && welcomeMessage) {
    toggleButton.addEventListener('click', () => {
        if (welcomeMessage.textContent === originalMessage) {
            welcomeMessage.textContent = alternateMessage;
        } else {
            welcomeMessage.textContent = originalMessage;
        }
    });
}

// Day 10: Form validation logic
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');

// My custom error messages
const errorMessages = {
    name: "Please enter your name",
    email: "Please enter a valid email address",
    message: "Please enter your message"
};

if (contactForm && nameInput && emailInput && messageInput && nameError && emailError && messageError) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = errorMessages.name;
            isValid = false;
        }

        // Validate email (basic check for @ and .)
        if (!emailInput.value.trim() || !emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            emailError.textContent = errorMessages.email;
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            messageError.textContent = errorMessages.message;
            isValid = false;
        }

        // If valid, simulate submission
        if (isValid) {
            alert('Form submitted successfully! (Simulated)');
            contactForm.reset(); // Clear form
        }
    });
} else {
    console.error('Form or input elements not found. Check IDs in contact.html');
}

// Day 11: Dark mode toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}