import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import {Badge} from "@mui/material";

import {IGenre} from "../../interfaces";
import css from './Genre.module.css'

interface IProps extends PropsWithChildren {
    genre: IGenre
}

const Genre: FC<IProps> = ({genre}) => {
    const {id, name} = genre
    const navigate = useNavigate()
    return (
        <div className={css.Genre}>
            <span className={css.Budge} onClick={() => navigate(`/genres/${id}`)}> <Badge badgeContent={name}
                                                                                          color="primary"></Badge></span>


        </div>
    );
};

export {Genre};