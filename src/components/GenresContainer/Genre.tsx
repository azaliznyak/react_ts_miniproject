import {FC, PropsWithChildren} from "react";
import {IGenre} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import css from './Genre.module.css'
import {Badge} from "@mui/material";

interface IProps extends PropsWithChildren {
genre:IGenre
}

const Genre : FC<IProps> = ({genre}) => {
    const { id, name}=genre
    const navigate= useNavigate()
 return (
     <div className={css.Genre}>
         <span className={css.Budge} onClick={()=>navigate(`/genres/${id}`)} > <Badge badgeContent={name} color="primary"></Badge></span>



     </div>
 );
};

export {Genre};