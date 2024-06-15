'user client';
import { createContext, useContext, useState } from "react";

// Create context
const GlobalContext = createContext();

// create provider
export function GlobalProvider({children}) {
    const [unreadCount, setUnreadCount] = useState(9);
    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}}>
            {children}
        </GlobalContext.Provider>
    );
}

// Create custom hook to access context
export function useGlobalContext() {
    return useContext();
}