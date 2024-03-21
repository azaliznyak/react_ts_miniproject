import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components";
import {useTheme} from "../hoc";

const MainLayout = () => {
    const { isDarkMode, toggleTheme } = useTheme()
    return (
        <div>
            <Header />
            <Outlet />

            </div>
    );
};

export {MainLayout};