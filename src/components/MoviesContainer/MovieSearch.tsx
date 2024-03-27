import React from 'react';
import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import css from './MovieSearch.module.css'
import {StarsRating} from '../StarsRating';


interface IProps extends PropsWithChildren {

}

const MovieSearch: FC<IProps> = () => {
    const {movies} = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';


    return (
        <div>
            <div className={css.MoviesList}>
                <div className={css.MovieRow}>

                    {movies.map(movie => (

                        <div key={movie.id} className={css.Movie}>
                            <div className={css.MovieTitle}>{movie.title}</div>
                            <img className={css.MovieImg} onClick={() => navigate(`/movie/${movie.id}`)}
                                 src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title}/>
                            <div className={css.Stars}>

                                <StarsRating vote_average={movie.vote_average}/>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export {MovieSearch};