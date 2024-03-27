import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector, usePageQuery} from "../hooks";
import {moviesActions} from "../redux";
import {MoviesByGenre} from "../components";


import css from "../components/MoviesContainer/MoviesList.module.css";

const MoviesByGenresPage = () => {
    const {id} = useParams();
    const {page, nextPage, prevPage} = usePageQuery();
    const dispatch = useAppDispatch();
    const {movies, total_pages} = useAppSelector(state => state.movies)


    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await dispatch(moviesActions.getMoviesByGenre({genreId: +id, page}));
            console.log(moviesData)

        };
        fetchData();
    }, [id, page, dispatch]);


    return (
        <div>

            <div className={css.MoviesList}>
                <div className={css.MovieRow}>
                    {movies.map(movie => <MoviesByGenre key={movie.id} movie={movie}/>)}

                </div>
            </div>
            <div className={css.MoviesButton}>
                <button disabled={page === '1'} onClick={prevPage}>prev</button>
                <div>{page}</div>
                <button disabled={page === `${total_pages}` || movies.length === 0} onClick={nextPage}>next</button>
            </div>

        </div>
    );
};

export {MoviesByGenresPage};