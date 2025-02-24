import { useState, useEffect, createContext, useContext } from 'react';
import * as authServices from '~/services/authServices';

const AuthContext = createContext();

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [userData, setUserData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData();
        } else {
            setUserData({});
            setIsAuthenticated(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        try {
            const result = await authServices.getCurrentUser(token);
            if (result) {
                setUserData(result);
                setIsAuthenticated(true);
                setError(null);
            } else {
                logout();
            }
        } catch (err) {
            console.log('>>> Fetch user data error:', err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const result = await authServices.login(email, password);
            if (result) {
                localStorage.setItem('token', result.meta.token);
                await fetchUserData();
                setIsAuthenticated(true);
                setError(null);
                return true;
            } else {
                setError('Login failed. Please check your credentials.');
                return false;
            }
        } catch (err) {
            console.log('>>> Login error:', err);
            setError('An error occurred during login.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            authServices.logout()
            localStorage.removeItem('token');
            setUserData({});
            setIsAuthenticated(false);
        } catch (err) {
            console.log('>>> Logout error:', err);
            setError('An error occurred during logout.');
        } finally {
            setLoading(false);
        }
    };

    const value = {
        userData,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        fetchUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider, useAuth };
