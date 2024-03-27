import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {moviesActions} from "../../redux";
import {MovieListCard} from "./MovieListCard";
import css from './MoviesList.module.css'


const MoviesList = () => {
    const dispatch = useAppDispatch();
    const {movies, total_pages} = useAppSelector(state => state.movies);
    const {isLoading} = useAppSelector(state => state.loading)
    const {page, nextPage, prevPage} = usePageQuery()


    useEffect(() => {
        dispatch(moviesActions.getAll({page}))
    }, [page, dispatch])
    return (
        <div>
            {isLoading && <h5>Loading...</h5>}
            <div className={css.MoviesList}>
                <div className={css.MovieRow}>
                    {movies.map(movie => <MovieListCard key={movie.id} movie={movie}/>)}
                </div>
            </div>

            <div className={css.MoviesButton}>
                <button disabled={page === '1'} onClick={prevPage}>prev</button>
                <div>{page}</div>
                <button disabled={page === `${total_pages}`} onClick={nextPage}>next</button>

            </div>

        </div>
    );
};

export {MoviesList};