import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import css from './Movie.module.css'
import {StarsRating} from "../StarsRating";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const MovieListCard: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average} = movie
    const navigate = useNavigate()
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className={css.Movie}>

            <div className={css.MovieTitle}>{title}</div>
            <img className={css.MovieImg} onClick={() => navigate(`/movie/${id}`)} src={`${baseImageUrl}${poster_path}`}
                 alt={title}/>


            <div>
                <StarsRating vote_average={vote_average}/>
            </div>

        </div>
    );
};

export {MovieListCard};