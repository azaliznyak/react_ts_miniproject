import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces";

import css from './Movie.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {id, title, poster_path} = movie
    const baseImageUrl=''
    return (
        <div className={css.Movie}>
            <div className={css.MovieTitle}>title:{title}</div>

        </div>
    );
};

export {MovieListCard};