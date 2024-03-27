import React, {useEffect} from 'react';

import {Genre} from "./Genre";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genresActions} from "../../redux";

const Genres = () => {
    const dispatch = useAppDispatch();
    const {genresMovies} = useAppSelector(state => state.genres);

    useEffect(() => {
        const response = dispatch(genresActions.getAllGenres())
        console.log(response)
    }, [dispatch])
    return (
        <div>

            {genresMovies.map(genre => <Genre key={genre.id} genre={genre}/>)}

        </div>
    );
};

export {Genres}