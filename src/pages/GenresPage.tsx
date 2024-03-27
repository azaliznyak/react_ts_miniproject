import React from 'react';
import {Outlet} from "react-router-dom";

import {Genres} from "../components";

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