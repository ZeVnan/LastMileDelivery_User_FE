import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");

    return (
        <UserContext.Provider value = {{userId, setUserId, userRole, setUserRole, token, setToken}}>
            {children}
        </UserContext.Provider>
    );
}