import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
                setFilteredPosts(data);
                console.log('Fetched posts:', data);
            })
            .catch((err) => {
                setError(err.message);
                console.error('Error fetching posts:', err);
            });
    }, []);

    useEffect(() => {
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        ReactGA.event({
            category: 'Blog',
            action: 'Search',
            label: e.target.value
        });
    };

    return (
        <section className="blog-section">
            <h2>My Blog</h2>
            <div className="blog-search">
                <label htmlFor="blog-search" className="sr-only">
                    Search blog posts
                </label>
                <input
                    type="text"
                    id="blog-search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={handleSearch}
                    aria-label="Search blog posts"
                    className="blog-search-input"
                />
            </div>
            {error && <p className="error">Error: {error}</p>}
            <div className="blog-posts">
                {filteredPosts.length === 0 && !error ? (
                    <p>{searchQuery ? 'No posts found' : 'Loading posts...'}</p>
                ) : (
                    filteredPosts.map((post) => (
                        <div key={post.id} className="blog-post">
                            {post.image && <img src={post.image} alt={post.title} loading="lazy" />}
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
                                    {post.image && <img src={post.image} alt={post.title} loading="lazy" />}
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