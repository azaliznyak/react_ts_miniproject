import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {moviesActions} from "../../redux";
import {MovieListCard} from "./MovieListCard";

import css from './MoviesList.module.css'


const MoviesList = () => {
    const dispatch=useAppDispatch();
    const {movies}=useAppSelector(state => state.movies);
    const {page, nextPage, prevPage}=usePageQuery()


    useEffect(()=>{
        dispatch(moviesActions.getAll({page}))
    },[page])
    return (
        <div>
            {movies.map(movie=><MovieListCard key={movie.id} movie={movie}/>)}

        </div>
    );
};

export {MoviesList};