import React, { useState } from 'react';
import { Send, Image as ImageIcon, X } from 'lucide-react';
import { usePosts } from '../context/PostContext';

const PostForm = ({ onSuccess }) => {
  const { createPost } = usePosts();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createPost(title, description);
    setTitle('');
    setDescription('');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="post-form-card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="post-title">Post Title</label>
          <div className="input-wrapper">
            <input 
              id="post-title"
              type="text" 
              placeholder="Give your post a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="post-desc">Content</label>
          <div className="input-wrapper">
            <textarea 
              id="post-desc"
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onSuccess}>
            <X size={18} />
            Cancel
          </button>
          <button type="submit" className="btn-primary" style={{ margin: 0, width: 'auto', padding: '12px 24px' }}>
            <Send size={18} />
            Publish Post
          </button>
        </div>
      </form>

    </div>
  );
};

export default PostForm;
