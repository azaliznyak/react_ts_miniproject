import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces";

import css from './Movie.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {id, title, poster_path} = movie
    const baseImageUrl='https://image.tmdb.org/t/p/w500'
    return (
        <div className={css.Movie}>
            <div className={css.MovieTitle}>{title}</div>
            <img className={css.MovieImg} src={`${baseImageUrl}${poster_path}`} alt={title}/>

        </div>
    );
};

export {MovieListCard};