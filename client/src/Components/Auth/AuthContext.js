import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
    // Simulate logged-in state for testing purposes
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for testing
    const [user, setUser] = useState({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '123-456-7890',
        user_type: 'Student',
        university_name: 'Example University',
    }); // Mock user data for testing

    // Function to log in (can be ignored during testing)
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    // Function to log out (can be ignored during testing)
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create the useAuth hook for simplified access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};