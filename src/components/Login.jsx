import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3300/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Credenziali non valide');
            }

            const data = await response.json();
            const { token } = data;

            login(token);

            // Aggiungi un log qui per vedere se questo viene eseguito
            console.log('Login eseguito con successo');
            navigate('/blog');
        } catch (error) {
            console.error('Errore durante il login:', error);
        }
    };


    return (
        <div className='height-77 container m-5 d-flex flex-column text-center align-items-center'>
            <h2>Login</h2>
            <form className='d-flex flex-column align-items-center' onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button className='btn btn-primary my-2' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
