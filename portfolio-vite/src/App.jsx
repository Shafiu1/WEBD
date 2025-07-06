import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import './index.css';
import '../public/style.css'; // Global CSS import

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <p>© 2025 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;