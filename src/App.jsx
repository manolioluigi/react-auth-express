import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Post from './components/Post';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
//import GuestRoute from './GuestRoute';
import Dashboard from './components/Dashboard';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/create-article" element={<PrivateRoute><CreateArticle /></PrivateRoute>} />
          <Route path="/edit-article/:articleId" element={<PrivateRoute><EditArticle /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
