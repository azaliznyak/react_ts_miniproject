import React from 'react';
import {NavLink} from "react-router-dom";
import css from './Header.module.css'

const Header = () => {
    return (
        <div>
            <div className={`${css.Header} ${css[theme]}`}>
                <div className={css.MovieIcon}>
                    {/*<h2 >MoviePulse</h2>*/}
                    <NavLink className={css.Home} to={'/movies'}>MoviePulse</NavLink>

                    <div className={css.icon}></div>
                </div>

                <div className={css.Links}>
                    <NavLink className={css.Nav1} to={'/genres'}>Genres</NavLink>
                    <NavLink className={css.Nav2} to={'/search'}>Search</NavLink>
                </div>




                <button className={`${css.toggle} ${css[theme]}`} onClick={toggleTheme}></button>
                <div className={css.UserIcon}>
                    <div className={css.icon2}></div>

                </div>

        </div>
    );
};

export {Header};