import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header>
            <div className="container d-flex justify-content-center align-items-center height-10">
                <div className="row width-full">
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            <div>
                                <a href="/" className="link">
                                    <h1>React Blog</h1>
                                </a>
                            </div>
                            <div className='d-flex align-items-center'>
                                <a className='link mx-3' href="/">
                                    <h5>Home</h5>
                                </a>
                                <a className='link' href="/blog">
                                    <h5>Blog</h5>
                                </a>
                                <a className='link mx-3' href="/dashboard">
                                    <h5>Dashboard</h5>
                                </a>
                                <div className='btn btn-primary mx-2 mb-1' onClick={handleLogin}>Login</div>
                                <div className='btn btn-warning mb-1' onClick={handleLogout}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
