// File: src/utils/authUtils.js

import { cookieStorageManager } from '@chakra-ui/react';
import { RouterPaths } from 'router/routerConfig';
import CookieManager from "api/cookieManager";

// Function to clear local storage
const clearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    CookieManager.clearCookie('token'); 
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Main logout function
export const logout = async (navigate, toast) => {
    try {
        // Perform any API calls to invalidate the session on the server
        // await api.post('/logout');

        // Clear local storage
        clearLocalStorage();

        // Redirect to home page
        navigate(RouterPaths.LOGIN, { replace: true });

        // Show success toast
        toast({
            title: "Logged out successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    } catch (error) {
        console.error('Logout failed:', error);
        toast({
            title: "Logout failed",
            description: "Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    }
};