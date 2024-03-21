import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren {
info:IMovie
}

const MovieInfo : FC<IProps> = ({info}) => {
 const {id, title, poster_path, overview, release_date, vote_average, backdrop_path}=info;

 const baseImageUrl='https://image.tmdb.org/t/p/w500'
 return (
  <div>
   <div>{title}</div>

  </div>
 );
};

export {MovieInfo};