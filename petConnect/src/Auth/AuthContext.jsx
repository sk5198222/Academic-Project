import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(true); // add loading state

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(storedUser);
        }

        setLoading(false); // finished loading after checking storage
    }, []);

    const login = async (userData) => {
        try {
            const res = await axios.post('https://localhost:7206/api/Users/login', userData);
            if (res.status === 200) {
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('token', res.data.token);
                toast.success('Login successful');
            }
        } catch (err) {
            toast.error(err.response?.data || 'Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success('Logout successful');
        window.location.replace("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, userType, setUserType, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
