import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (token) => {
        try {
            const decodedToken = decodeToken(token);
            const user = { ...decodedToken };

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Errore durante il recupero delle informazioni dell\'utente:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error('Errore durante la decodifica del token JWT:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
