import { useState } from 'react';
import '../public/style.css';

// My custom Vite React projects
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

function Projects() {
    const [filter, setFilter] = useState('all');
    const [modalProject, setModalProject] = useState(null);

    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    const handleFilterClick = (category) => {
        console.log(`Filtering projects by ${category}`);
        setFilter(category);
    };

    const openModal = (project) => {
        console.log(`Opening modal for ${project.title}`);
        setModalProject(project);
    };

    const closeModal = () => {
        console.log('Closing modal');
        setModalProject(null);
    };

    return (
        <div>
            <header>
                <h1>My Portfolio</h1>
                <nav aria-label="Main navigation">
                    <ul>
                        <li><a href="/" className="active">Projects</a></li>
                    </ul>
                </nav>
                <button
                    id="dark-mode-toggle"
                    aria-label="Toggle dark mode"
                    onClick={() => document.body.classList.toggle('dark-mode')}
                >
                    Toggle Dark Mode
                </button>
            </header>
            <main>
                <section>
                    <h2>My Projects</h2>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            data-filter="all"
                            aria-pressed={filter === 'all'}
                            onClick={() => handleFilterClick('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${filter === 'web-apps' ? 'active' : ''}`}
                            data-filter="web-apps"
                            aria-pressed={filter === 'web-apps'}
                            onClick={() => handleFilterClick('web-apps')}
                        >
                            Web Apps
                        </button>
                        <button
                            className={`filter-btn ${filter === 'portfolios' ? 'active' : ''}`}
                            data-filter="portfolios"
                            aria-pressed={filter === 'portfolios'}
                            onClick={() => handleFilterClick('portfolios')}
                        >
                            Portfolios
                        </button>
                    </div>
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={index}
                                className="project-card"
                                role="button"
                                aria-label={`View details for ${project.title}`}
                                onClick={() => openModal(project)}
                                tabIndex="0"
                                onKeyDown={(e) => e.key === 'Enter' && openModal(project)}
                            >
                                <img
                                    className="project-image"
                                    src={project.image}
                                    alt={project.title}
                                    onError={(e) => {
                                        console.error(`Failed to load image for ${project.title}: ${project.image}`);
                                        e.target.src = 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200';
                                    }}
                                />
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {modalProject && (
                        <div
                            className="modal active"
                            role="dialog"
                            aria-label="Project details modal"
                            tabIndex="-1"
                            onKeyDown={(e) => e.key === 'Escape' && closeModal()}
                        >
                            <div className="modal-content">
                                <span
                                    className="modal-close"
                                    aria-label="Close modal"
                                    onClick={closeModal}
                                    tabIndex="0"
                                    onKeyDown={(e) => e.key === 'Enter' && closeModal()}
                                >
                                    ×
                                </span>
                                <img
                                    className="modal-image"
                                    src={modalProject.image}
                                    alt={modalProject.title}
                                    onError={(e) => {
                                        console.error(`Failed to load modal image for ${modalProject.title}: ${modalProject.image}`);
                                        e.target.src = 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200';
                                    }}
                                />
                                <h3 className="modal-title">{modalProject.title}</h3>
                                <p className="modal-description">{modalProject.description}</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <footer>
                <p>© 2025 My Portfolio. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Projects;