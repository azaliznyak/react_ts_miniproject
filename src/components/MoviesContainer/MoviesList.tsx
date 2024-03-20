import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux";
import {MovieListCard} from "./MovieListCard";

const MoviesList = () => {
    const dispatch=useAppDispatch();
    const {movies}=useAppSelector(state => state.movies);


    useEffect(()=>{
        dispatch(moviesActions.getAll())
    },[])
    return (
        <div>
            {movies.map(movie=><MovieListCard key={movie.id} movie={movie}/>)}

        </div>
    );
};

export {MoviesList};