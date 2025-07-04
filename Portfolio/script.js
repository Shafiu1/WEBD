// Day 9: Toggle button message
document.getElementById('toggle-button')?.addEventListener('click', function () {
    const message = document.createElement('p');
    message.textContent = 'Button clicked! This is a dynamic message.';
    document.querySelector('main').appendChild(message);
    setTimeout(() => message.remove(), 3000);
});

// Day 10: Form validation
document.querySelector('form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    let isValid = true;

    document.querySelectorAll('.error').forEach(error => error.remove());

    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    }
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!email.includes('@')) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }

    if (isValid) {
        alert('Thanks for your message!');
        this.reset();
        localStorage.removeItem('contactFormData');
    }
});

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.createElement('span');
    error.className = 'error';
    error.textContent = message;
    input.parentNode.appendChild(error);
}

// Day 11: Dark mode toggle
document.getElementById('dark-mode-toggle')?.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Day 16 & 20: Dynamic project cards with categories
// My custom project data
const projects = [
    {
        title: 'Project One',
        description: 'A web app built with HTML, CSS, and JavaScript.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'web-apps'
    },
    {
        title: 'Project Two',
        description: 'A responsive portfolio website.',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'portfolios'
    },
    {
        title: 'Project Three',
        description: 'A dynamic task manager app.',
        image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'web-apps'
    }
];

function createProjectCards(filter = 'all') {
    const grid = document.querySelector('.projects-grid');
    if (!grid) {
        console.error('Projects grid not found');
        return;
    }

    // Clear existing cards
    grid.innerHTML = '';
    console.log(`Creating project cards with filter: ${filter}`);

    // Filter projects
    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    filteredProjects.forEach((project, index) => {
        console.log(`Creating card ${index}: ${project.image}`);
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.index = projects.indexOf(project); // Use original index for modal
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${project.title}`);

        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = project.image;
        img.alt = project.title;
        img.onerror = () => {
            console.error(`Failed to load image for ${project.title}: ${project.image}`);
            img.src = 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200';
        };

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

// Day 17 & 19: Modal event listeners with accessibility
function setupModal() {
    const modal = document.getElementById('project-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');

    if (!modal || !modalImage || !modalTitle || !modalDescription || !modalClose) {
        console.error('Modal elements not found');
        return;
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = card.dataset.index;
            console.log(`Opening modal for card ${index}`);
            const project = projects[index];
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalImage.onerror = () => {
                console.error(`Failed to load modal image for ${project.title}: ${project.image}`);
                modalImage.src = 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200';
            };
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modal.classList.add('active');
            modal.focus();
        });
    });

    modalClose.addEventListener('click', () => {
        console.log('Closing modal');
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Closing modal via background click');
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            console.log('Closing modal via Escape key');
            modal.classList.remove('active');
        }
    });
}

// Day 18: Local storage for contact form
// My custom local storage logic
function setupFormPersistence() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.log('Contact form not found');
        return;
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        nameInput.value = formData.name || '';
        emailInput.value = formData.email || '';
        messageInput.value = formData.message || '';
        console.log('Loaded form data from localStorage:', formData);
    }

    form.addEventListener('input', () => {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        console.log('Saved form data to localStorage:', formData);
    });
}

// Day 20: Project filtering
// My custom project filtering logic
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) {
        console.log('Filter buttons not found');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            console.log(`Filtering projects by ${filter}`);

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            // Recreate project cards with filter
            createProjectCards(filter);
            setupModal(); // Re-attach modal event listeners
        });
    });
}

// Run page-specific logic
if (document.querySelector('.projects-grid')) {
    console.log('Initializing projects page');
    createProjectCards();
    setupModal();
    setupProjectFiltering();
}
if (document.getElementById('contact-form')) {
    console.log('Initializing contact form');
    setupFormPersistence();
  }