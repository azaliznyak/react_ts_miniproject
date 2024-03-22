import React, {useEffect, useState} from 'react';
import { movieService } from '../services';
import {useAppDispatch, useAppSelector, usePageQuery} from "../hooks";
import { useParams } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {moviesActions} from "../redux";
import {MoviesByGenre} from "../components/GenresContainer/MoviesByGenre";
import {IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";
import {PayloadAction} from "@reduxjs/toolkit";

import css from "../components/MoviesContainer/MoviesList.module.css";

const MoviesByGenresPage = () => {
    // const [ movies,setMovies] = useState<IMovie[]>([]);
    // const [totalPages, setTotalPages] = useState(0);
    const { id } = useParams();
    const { page, nextPage, prevPage } = usePageQuery();
    const dispatch=useAppDispatch();
    const {movies, total_pages}=useAppSelector(state => state.movies)


    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await dispatch(moviesActions.getMoviesByGenre({genreId:+id,page}));
            console.log(moviesData)

            // if (moviesData) {
            //     dispatch(moviesActions.setMoviesByGenre(moviesData.results);
            // }

        };
        fetchData();
    }, [id, page]);



    return (
        <div>

            <div className={css.MoviesList}>
                <div className={css.MovieRow}>
                    {movies.map(movie => <MoviesByGenre key={movie.id} movie={movie} />)}

                </div>
            </div>
            <div className={css.MoviesButton}>
                <button disabled={page === '1'} onClick={prevPage}>prev</button>
                <div>{page}</div>
                <button disabled={page === `${total_pages}` || movies.length===0} onClick={nextPage}>next</button>
            </div>
            
        </div>
    );
};

export {MoviesByGenresPage};