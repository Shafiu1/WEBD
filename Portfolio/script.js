// Select the button and message elements
const toggleButton = document.querySelector('#toggle-button');
const welcomeMessage = document.querySelector('#welcome-message');

// My custom toggle message
const originalMessage = "Hello, I'm Shafiul Alam. Check out my responsive portfolio!";
const alternateMessage = "Welcome to my web development journey!";

// Add click event listener to the button
toggleButton.addEventListener('click', () => {
    if (welcomeMessage.textContent === originalMessage) {
        welcomeMessage.textContent = alternateMessage;
    } else {
        welcomeMessage.textContent = originalMessage;
    }
});