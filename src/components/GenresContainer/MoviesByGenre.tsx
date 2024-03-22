import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren {
movie:IMovie
}

const MoviesByGenre : FC<IProps> = ({movie}) => {
    const {title}=movie
 return (
  <div>
      <div>title-{title}</div>

  </div>
 );
};

export {MoviesByGenre};