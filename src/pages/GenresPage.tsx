import React from 'react';
import {Genres} from "../components";
import {Outlet} from "react-router-dom";

const GenresPage = () => {
    return (
        <div>
            <Genres/>
            <hr/>
            <Outlet/>
        </div>
    );
};

export {GenresPage};