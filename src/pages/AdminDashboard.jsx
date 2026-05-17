import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { ShieldCheck, Users, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { posts } = usePosts();

  return (
    <div className="dashboard-container">
      <header className="admin-header">
        <div className="welcome-section">
          <h1>Admin Control Panel <ShieldCheck size={24} className="inline-icon" /></h1>
          <p>Logged in as {user.name} (Administrator)</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <FileText size={20} />
            <div>
              <h3>{posts.length}</h3>
              <p>Total Posts</p>
            </div>
          </div>
          <div className="stat-card">
            <Users size={20} />
            <div>
              <h3>{new Set(posts.map(p => p.creatorEmail)).size}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </header>

      <section className="posts-section">
        <div className="section-title">
          <h2>All User Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts available in the system.</p>
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

export default AdminDashboard;
