import React from 'react';
import {NavLink} from "react-router-dom";
import { useTheme } from '../../hoc';
import css from './Header.module.css'

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div>
            <div className={`${css.Header} ${isDarkMode ? css.dark : css.light}`}>
                <div className={css.MovieIcon}>
                    <NavLink className={css.Home} to={'/movies'}>MoviePulse</NavLink>
                    <div className={css.icon}></div>
                </div>

                <div className={css.Links}>
                    <NavLink className={css.Nav1} to={'/genres'}>Genres</NavLink>
                    <NavLink className={css.Nav2} to={'/search'}>Search</NavLink>
                </div>

                <button className={`${css.toggle} ${isDarkMode ? css.dark : css.light}`} onClick={toggleTheme}></button>
                <div className={css.UserIcon}>
                    <div className={css.icon2}></div>
                </div>
            </div>


        </div>
    );
};

export {Header}