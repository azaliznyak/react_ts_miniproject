import {apiService} from "./apiService";
import {urls} from "../constants";
import {IGenres, IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";
import axios from "axios";



const movieService={
    getAll:(page:number):IRes<IPagination<IMovie>> =>apiService.get(urls.movies.base, {params:{page}} ) , //{params:{page}}
    getById:(id:number):IRes<IMovie> =>apiService.get(urls.movies.movieById(id)),
    getByIdInfo:(id:number):IRes<IMovie> =>apiService.get(urls.movieInfo.byId(id)),
    getByGenre: async (genreId:number, page:any):Promise<IPagination<IMovie>> => {
        try {
            const response = await apiService.get(urls.movies.moviesByGenre(genreId), { params: { page } });
            if (!response) {
                throw new Error('Failed to fetch movies by genre');
            }
            const dataI = await response.data;
            return dataI;
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            return null;
        }
    },
    // getTotalPagesByGenre: async (genreId:number):Promise<IRes<IPagination<IMovie>>>  => {
    //     try {
    //         const response = await apiService.get(urls.movies.moviesByGenre(genreId));
    //         if (!response) {
    //             throw new Error('Failed to fetch total pages by genre');
    //         }
    //         const dataI = await response.data;
    //         return dataI.total_pages;
    //     } catch (error) {
    //         console.error('Error fetching total pages by genre:', error);
    //         return null;
    //     }
    // }


}


export {
    movieService
}