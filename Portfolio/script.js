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


// Day 16: Dynamic project cards
// My custom project data
const projects = [
    {
        title: 'Project One',
        description: 'A web app built with HTML, CSS, and JavaScript.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
    },
    {
        title: 'Project Two',
        description: 'A responsive portfolio website.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200'
    },
    {
        title: 'Project Three',
        description: 'A dynamic task manager app.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
    }
  ];

function createProjectCards() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = project.image;
        img.alt = project.title;

        const content = document.createElement('div');
        content.className = 'project-content';

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        content.appendChild(title);
        content.appendChild(description);
        card.appendChild(img);
        card.appendChild(content);
        grid.appendChild(card);
    });
}

// Run when projects.html loads
if (document.querySelector('.projects-grid')) {
    createProjectCards();
  }