import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {IMovie, Video} from "../../interfaces";

import css from './MovieInfo.module.css'
import StarRatings from "react-star-ratings";
import {StarsRating} from "../StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import axios from "axios";
import {apiService} from "../../services";
import {moviesActions} from "../../redux";


interface IProps extends PropsWithChildren {
info:IMovie,
}

const MovieInfo : FC<IProps> = ({info}) => {
 const {id, title, poster_path, overview, release_date, vote_average, backdrop_path}=info;
 // const {genre_ids}=useAppSelector(state => state.movies)
    const dispatch=useAppDispatch()

    // const [videoKey, setVideoKey] = useState<string | null>(null);
    const [videoKey, setVideoKey] = useState<Video[]>([]);







    useEffect(() => {
        const fetchVideoKeys = async () => {
            try {
                const response = await dispatch(moviesActions.getMovieVideo({ id }));
                const videoKeysData: Video[] = response.payload as Video[];
                setVideoKey(videoKeysData);
            } catch (error) {
                console.error("Error fetching video keys:", error);
            }
        };

        fetchVideoKeys();
    }, [id]);





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











 const baseImageUrl='https://image.tmdb.org/t/p/w500'
 return (
     <div className={css.MovieInfo}>
      <div className={css.Title}>{title}</div>
      <div className={css.wrap}>

       <img src={`${baseImageUrl}${poster_path}`} alt={title}/>
       <div className={css.wrap2}>

        <div>Rating - <StarsRating vote_average={vote_average}/></div>
        <div>Release date:{release_date}</div>
           {/*<div>{genre_ids.map(genre_id=>())}</div>*/}
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