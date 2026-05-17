import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initial sample posts
      const initialPosts = [
        {
          id: 1,
          title: "Welcome to BlogMaster! 🚀",
          description: "This is a frontend-only blog application where everything is stored in your browser's local storage. Feel free to explore, create an account, and start posting!",
          createdBy: "Admin",
          creatorEmail: "admin@example.com",
          timestamp: new Date().toLocaleString()
        },
        {
          id: 2,
          title: "Why Local Storage is cool",
          description: "Local storage allows us to keep your data right in your browser. No server-side database is required for this demo, making it fast and private!",
          createdBy: "Sana Coder",
          creatorEmail: "sana@example.com",
          timestamp: new Date().toLocaleString()
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const createPost = (title, description) => {
    if (!user) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
      createdBy: user.name,
      creatorEmail: user.email,
      creatorRole: user.role,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    toast.success('Post created successfully!');
  };

  const deletePost = (postId) => {
    const postToDelete = posts.find(p => p.id === postId);
    
    if (!postToDelete) return;

    // Only creator or admin can delete
    if (user.role === 'admin' || postToDelete.creatorEmail === user.email) {
      const updatedPosts = posts.filter(p => p.id !== postId);
      savePosts(updatedPosts);
      toast.info('Post deleted');
    } else {
      toast.error('You do not have permission to delete this post');
    }
  };

  return (
    <PostContext.Provider value={{ posts, createPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
