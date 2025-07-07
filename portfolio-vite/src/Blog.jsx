import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/posts.json')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch posts');
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                console.log('Fetched posts:', data);
            })
            .catch((err) => {
                setError(err.message);
                console.error('Error fetching posts:', err);
            });
    }, []);

    return (
        <section className="blog-section">
            <h2>My Blog</h2>
            {error && <p className="error">Error: {error}</p>}
            <div className="blog-posts">
                {posts.length === 0 && !error ? (
                    <p>Loading posts...</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="blog-post">
                            <h3>{post.title}</h3>
                            <p className="blog-date">{post.date}</p>
                            <p>{post.excerpt}</p>
                            <button
                                className="blog-read-more"
                                onClick={() => {
                                    setSelectedPost(post);
                                    ReactGA.event({
                                        category: 'Blog',
                                        action: 'Read More',
                                        label: post.title
                                    });
                                }}
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
                    ))
                )}
            </div>
        </section>
    );
}

export default Blog;