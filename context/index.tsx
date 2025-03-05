import React, { createContext, useContext, useState } from "react";
import { useNavigation, ScreenProps } from "expo-router";

// Define the context data type
interface ContextData {
    token: string
}

// Define the context's data type
interface ContextType {
    contextData: ContextData;
    setValue: (value: Partial<ContextData>) => void; // You can only update part of contextData
}

// Initial context state
const initialContextData: ContextType = {
    contextData: {
        token: ""
    },
    setValue: () => { }, // Placeholder, not used at initialization
};

// Create the context
const Context = createContext<ContextType>(initialContextData);

// Define the provider component
const StateContext = ({ children }: { children: React.ReactNode }) => {

    // State to hold context data
    const [contextData, setContext] = useState<ContextData>({
        token: "",
    });

    

    // Function to update context data
    const setValue = (value: Partial<ContextData>) => {
        setContext((prevContext) => ({ ...prevContext, ...value }));
    };

    return (
        <Context.Provider value={{ contextData, setValue }}>
            {children}
        </Context.Provider>
    );
};

// Custom hook to access the context data
export const useStateContext = () => {
    return useContext(Context);
};

export default StateContext;
