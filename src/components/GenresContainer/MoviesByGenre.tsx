import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import css from './MoviesByGenre.module.css'
import {StarsRating} from "../StarsRating";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const MoviesByGenre: FC<IProps> = ({movie}) => {
    const {title, poster_path, id, vote_average} = movie;
    const navigate = useNavigate()
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
    return (
        <div className={css.Movie}>
            <div className={css.MovieTitle}>{title}</div>
            <img className={css.MovieImg} onClick={() => navigate(`/movie/${id}`)} src={`${baseImageUrl}${poster_path}`}
                 alt={title}/>
            <div className={css.Stars}>

                <StarsRating vote_average={vote_average}/>

            </div>

        </div>
    );
};

export {MoviesByGenre};