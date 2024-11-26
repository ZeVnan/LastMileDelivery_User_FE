import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider 
            value = {{
            userId, setUserId, 
            userRole, setUserRole, 
            token, setToken,
            userName, setUserName}}>
            {children}
        </UserContext.Provider>
    );
}