import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../hooks";
import {moviesActions} from "../redux";
import {MovieInfo} from "../components";
import {IMovie} from "../interfaces";

const MoviesInfoPage = () => {

    const {id} = useParams()
    const [info, setInfo] = useState<IMovie | null>(null);

    const dispatch = useAppDispatch()


    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response = await dispatch(moviesActions.getInfo({id: +id}));

                setInfo(response.payload as IMovie)
                console.log(response);
            } catch (error) {
                console.error('Error fetching movie info:', error);
            }
        };

        fetchMovieInfo();
    }, [dispatch, id])

    return (
        <div>
            {info && <MovieInfo info={info}/>}

        </div>
    );
};

export {MoviesInfoPage};