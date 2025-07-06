import { Link } from 'react-router-dom';

// My custom React home component
function Home() {
    return (
        <section className="home-section">
            <h2>Welcome to My Portfolio</h2>
            <p>Hi, I'm a web developer passionate about creating modern, responsive websites.</p>
            <p>Explore my <Link to="/projects">projects</Link> to see my work or <Link to="/contact">contact me</Link> to get in touch!</p>
        </section>
    );
}

export default Home;