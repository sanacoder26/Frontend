import React from 'react';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { posts } = usePosts();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Express Yourself to the <span>World</span></h1>
          <p>Join our community of creators and share your stories, ideas, and experiences with a global audience.</p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary" style={{ margin: 0, width: 'auto' }}>Get Started Free</Link>
            <Link to="/login" className="btn-outline">Sign In</Link>
          </div>
        </div>
      </section>

      <main className="feed-section">
        <div className="section-header">
          <div className="section-title">
            <MessageCircle size={24} />
            <h2>Latest Stories</h2>
          </div>
          <p>{posts.length} posts shared by the community</p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-feed">
            <h3>No stories yet</h3>
            <p>Be the first to share something amazing!</p>
            <Link to="/signup" className="btn-primary" style={{ width: 'auto', marginTop: '1rem' }}>Create Account</Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default Home;
