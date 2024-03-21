import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components";
import {useTheme} from "../hoc";

import css from './Layout.module.css'

const MainLayout = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={isDarkMode ? `${css.dark}` : `${css.light}`}>
            <Header />
            <Outlet />

            </div>
    );
};

export {MainLayout};