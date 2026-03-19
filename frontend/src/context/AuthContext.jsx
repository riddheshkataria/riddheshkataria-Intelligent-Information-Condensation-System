import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('userToken'));

    const login = useCallback((newToken) => {
        localStorage.setItem('userToken', newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('userToken');
        setToken(null);
    }, []);

    const value = useMemo(() => ({
        token,
        isAuthenticated: !!token,
        login,
        logout,
    }), [token, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
