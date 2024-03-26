import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {IGenre, IGenres, IMovie, Video} from "../../interfaces";

import css from './MovieInfo.module.css'
import StarRatings from "react-star-ratings";
import {StarsRating} from "../StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import axios from "axios";
import {apiService} from "../../services";
import {genresActions, moviesActions} from "../../redux";
import {useNavigate} from "react-router-dom";
import {Badge} from "@mui/material";


interface IProps extends PropsWithChildren {
    info: IMovie,

}

const MovieInfo: FC<IProps> = ({info}) => {
    const { id,title, poster_path, overview, release_date, vote_average, backdrop_path, genres} = info;
    const {movies, genre_ids} = useAppSelector(state => state.movies)
    const {genresMovies} = useAppSelector(state => state.genres)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    console.log(info)
    console.log(genres)



    // const [videoKey, setVideoKey] = useState<string | null>(null);
    const [videoKey, setVideoKey] = useState<Video[]>([]);

    const [movieGenres, setMovieGenres] = useState<string[] | null>([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                await dispatch(genresActions.getAllGenres());
                 const genresName=genres.map(genre=>genre.name)

                setMovieGenres(genresName);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };


        fetchGenres();
    }, [dispatch]);


    const handleGenreClick = (genre: IGenre) => {
        navigate(`/genres/${genre.id}`);
    };





    // useEffect(()=>{
    //     async function fetchVideoKey(videoId: string): Promise<string> {
    //         const apiKey = 'AIzaSyBdw8oTy41rofYiUZLg68b5KkBP5XLHOYo';
    //         const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet`;
    //
    //         try {
    //             const response = await axios.get(apiUrl);
    //             const videoInfo = response.data.items[0];
    //             if (videoInfo && videoInfo.id) {
    //                 return videoInfo.id; // Повертаємо ID відео
    //             } else {
    //                 console.error("No video found for ID:", videoId);
    //                 return '';
    //             }
    //         } catch (error) {
    //             console.error("Error fetching video key:", error);
    //             return '';
    //         }
    //     }
    //     async function playVideo(videoId: string) {
    //         const videoKeys = await fetchVideoKey(videoId) ;
    //         if (videoKeys) {
    //             setVideoKey(videoKeys)
    //         } else {
    //             console.error("No video found for ID:", videoId);
    //         }
    //     }
    //     playVideo(`${id}`)
    //
    // },[id])


    const baseImageUrl = 'https://image.tmdb.org/t/p/w500'
    return (
        <div className={css.MovieInfo}>
            <div className={css.Title}>{title}</div>
            <div className={css.wrap}>

                <img src={`${baseImageUrl}${poster_path}`} alt={title}/>
                <div className={css.wrap2}>

                    <div>Rating - <StarsRating vote_average={vote_average}/></div>
                    <div>Release date:{release_date}

                    </div>


                    {/*<p> Genres: {movieGenres.join(', ') }</p>*/}
                    <p >Genres: {movieGenres.map((genre, index) => (
                        <span key={index} className={css.Genre} onClick={() => handleGenreClick(genres[index])}><Badge badgeContent={genre} color={"primary"}></Badge></span>
                    ))}</p>
                    <p>Overview:
                        {overview}

                    </p>

                    Video player
                    {videoKey && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoKey}`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}


                </div>
            </div>


        </div>
    );
};

export {MovieInfo};