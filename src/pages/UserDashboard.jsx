import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Plus, LayoutGrid, MessageSquare } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { posts } = usePosts();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Hello, {user.name}! 👋</h1>
          <p>What's on your mind today?</p>
        </div>
        <button 
          className="btn-create"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : (
            <>
              <Plus size={20} />
              <span>Create New Post</span>
            </>
          )}
        </button>
      </header>

      {showForm && (
        <div className="form-section">
          <PostForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <section className="posts-section">
        <div className="section-title">
          <MessageSquare size={20} />
          <h2>Community Feed</h2>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <LayoutGrid size={48} />
            <p>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default UserDashboard;
