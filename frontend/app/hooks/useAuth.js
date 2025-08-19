'use client';

import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        try {
            const result = await authService.login(username, password);
            setIsLoggedIn(true);
            return result;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return {
        isLoggedIn,
        login,
        logout
    };
};
