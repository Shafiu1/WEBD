import { useState } from 'react';
import { Link } from 'react-router-dom';

const posts = [
    {
        id: 1,
        title: 'Building a React Portfolio',
        excerpt: 'How I created a responsive portfolio using React and Vite.',
        content: 'This post details my journey of building a portfolio with React Router, Netlify Forms, and animations...',
        date: 'July 6, 2025',
    },
    {
        id: 2,
        title: 'Mastering CSS Animations',
        excerpt: 'Tips for creating smooth animations in CSS.',
        content: 'Learn how to use CSS keyframes for fade-in and hover effects...',
        date: 'July 5, 2025',
    },
    {
        id:3,
        title:'Deploying to Netlify',
        excerpt:'How to deploy a React app...',
        content:'Steps to deploy using Netlify...',
        date:'July 4, 2025',
    },
];

function Blog() {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <section className="blog-section">
            <h2>My Blog</h2>
            <div className="blog-posts">
                {posts.map((post) => (
                    <div key={post.id} className="blog-post">
                        <h3>{post.title}</h3>
                        <p className="blog-date">{post.date}</p>
                        <p>{post.excerpt}</p>
                        <button
                            className="blog-read-more"
                            onClick={() => setSelectedPost(post)}
                            aria-label={`Read more about ${post.title}`}
                        >
                            Read More
                        </button>
                        {selectedPost?.id === post.id && (
                            <div className="blog-content">
                                <p>{post.content}</p>
                                <button
                                    className="blog-close"
                                    onClick={() => setSelectedPost(null)}
                                    aria-label="Close blog post"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Blog;