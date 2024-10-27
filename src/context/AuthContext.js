import { useState, useEffect, createContext, useContext } from 'react';
import * as authServices from '~/services/authServices';

const AuthContext = createContext();

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Tự động đăng nhập lại người dùng nếu có token
            fetchUserData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // setLoading(true);
        try {
            const result = await authServices.getCurrentUser(token);
            if (result) {
                setUserData(result);
                setIsAuthenticated(true);
                setError(null);
            } else {
                logout(); // Đăng xuất nếu không lấy được dữ liệu người dùng
            }
        } catch (err) {
            console.log('>>> Fetch user data error:', err);
            logout(); // Đăng xuất nếu token không hợp lệ
        } finally {
            // setLoading(false);
        }
    };

    const login = async (email, password) => {
        // setLoading(true);
        try {
            const result = await authServices.login(email, password);
            if (result) {
                localStorage.setItem('token', result.meta.token);
                fetchUserData(); // Gọi lại fetchUserData để lấy thông tin người dùng sau khi đăng nhập
                setIsAuthenticated(true);
                setError(null);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.log('>>> Login error:', err);
            setError('An error occurred during login.');
        } finally {
            // setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-id');
        setUserData(null);
        setIsAuthenticated(false);
    };

    const value = {
        userData,
        isAuthenticated,
        // loading,
        error,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider, useAuth };
