import { useState } from 'react';

const projects = [
    {
        id: 1,
        title: 'Project One',
        description: 'A web app built with HTML and CSS.',
        image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'web-apps'
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'A React-based dashboard.',
        image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'web-apps'
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'A static site with animations.',
        image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'static-sites'
    }
];

function Projects() {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = filter === 'all' ? projects : projects.filter((project) => project.category === filter);

    return (
        <section className="projects-section">
            <h2>My Projects</h2>
            <div className="filter-buttons">
                <button className="filter-btn" onClick={() => setFilter('all')}>
                    All
                </button>
                <button className="filter-btn" onClick={() => setFilter('web-apps')}>
                    Web Apps
                </button>
                <button className="filter-btn" onClick={() => setFilter('static-sites')}>
                    Static Sites
                </button>
            </div>
            <div className="project-grid">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
                        <img src={project.image} alt={project.title} loading="lazy" />
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
            {selectedProject && (
                <div className="projects-section__modal">
                    <div className="modal-content">
                        <img src={selectedProject.image} alt={selectedProject.title} loading="lazy" />
                        <h3>{selectedProject.title}</h3>
                        <p>{selectedProject.description}</p>
                        <button onClick={() => setSelectedProject(null)} aria-label="Close modal">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;