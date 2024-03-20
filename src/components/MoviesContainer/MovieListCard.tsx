import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren {
movie:IMovie
}

const MovieListCard : FC<IProps> = ({movie}) => {

 const {id, title}=movie
 return (
  <div>
   <div>id:{id}</div>
   <div>title:{title}</div>

  </div>
 );
};

export {MovieListCard};