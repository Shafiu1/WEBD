import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('contactForm');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            localStorage.setItem('contactForm', JSON.stringify(formData));
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirect after 2s to show success message
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <section className="contact-section">
            <h2>Contact Me</h2>
            {submitted ? (
                <p className="success-message">Thank you! Your message has been sent.</p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="contact-section__form"
                    name="contact"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden>
                        <label>
                            Don’t fill this out: <input name="bot-field" />
                        </label>
                    </p>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="form-input"
                    />
                    {errors.name && <span id="name-error" className="error">{errors.name}</span>}

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="form-input"
                    />
                    {errors.email && <span id="email-error" className="error">{errors.email}</span>}

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className="form-textarea"
                    />
                    {errors.message && <span id="message-error" className="error">{errors.message}</span>}

                    <button type="submit">Submit</button>
                </form>
            )}
        </section>
    );
}

export default Contact;