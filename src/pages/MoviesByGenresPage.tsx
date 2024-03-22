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

const MoviesByGenresPage = () => {
    // const [ movies,setMovies] = useState<IMovie[]>([]);
    // const [totalPages, setTotalPages] = useState(0);
    const { id } = useParams();
    const { page, nextPage, prevPage } = usePageQuery();
    const dispatch=useAppDispatch();
    const {movies, moviesByGenre}=useAppSelector(state => state.movies)


    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    useEffect(() => {
        const response=dispatch(moviesActions.getMoviesByGenre({genreId:+id,page}))
        console.log(response)
    }, [id]);

    const handleGenreChange = (genreId: number) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter(id => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };




    return (
        <div>

            {moviesByGenre.map(movie=><MoviesByGenre key={movie.id} movie={movie}/>)}
            
        </div>
    );
};

export {MoviesByGenresPage};