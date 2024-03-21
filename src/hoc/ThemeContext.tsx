import React, {createContext, useState, useContext, FC, ReactNode, useEffect} from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
interface ThemeProviderProps {
    children: ReactNode;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
           const newMode= !prevMode;
           localStorage.setItem('theme', JSON.stringify(newMode));
           return newMode
        });
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(JSON.parse(storedTheme));
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
};

export {
    useTheme
}