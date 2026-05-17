import React from 'react';
import { Trash2, User, Clock, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const { deletePost } = usePosts();

  const canDelete = user && (user.role === 'admin' || post.creatorEmail === user.email);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
          <User size={16} />
        </div>
        <div className="post-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="post-author">{post.createdBy}</span>
            {post.creatorRole === 'admin' && <span className="admin-badge">Admin</span>}
          </div>
          <div className="post-time">
            <Clock size={12} />
            <span>{post.timestamp}</span>
          </div>
        </div>
        {canDelete && (
          <button 
            className="btn-delete" 
            onClick={() => deletePost(post.id)}
            title="Delete post"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.description}</p>
      </div>

      <div className="post-footer">
        <button className="post-action">
          <Heart size={18} />
          <span>Like</span>
        </button>
      </div>

    </div>
  );
};

export default PostCard;
