import { useState, useEffect } from 'react';
import './index.css'; // Assuming styles are here or in index.css

function Blog() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    useEffect(() => {
        fetch('/posts.json')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    useEffect(() => {
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
        setCurrentPage(1); // Reset to page 1 on search
    }, [searchTerm, posts]);

    // Calculate posts for current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="blog">
            <h1>Blog</h1>
            <input
                type="text"
                aria-label="Search blog posts"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="posts">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div key={post.id} className="post">
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                            {post.image && (
                                <img src={post.image} alt={post.title} loading="lazy" />
                            )}
                            <p>{post.content}</p>
                            <small>{post.date}</small>
                        </div>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </div>
            <div className="pagination">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {Math.ceil(filteredPosts.length / postsPerPage)}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Blog;