import { NavLink } from 'react-router-dom';

function Header() {
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        console.log(`Toggled dark mode: ${document.body.classList.contains('dark-mode') ? 'on' : 'off'}`);
    };

    return (
        <header>
            <h1>My Portfolio</h1>
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/skills" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Skills
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Blog
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button
                id="dark-mode-toggle"
                aria-label="Toggle dark mode"
                onClick={toggleDarkMode}
            >
                Toggle Dark Mode
            </button>
        </header>
    );
}

export default Header;