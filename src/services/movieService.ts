import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";


const movieService = {
    getAll: (page: number): IRes<IPagination<IMovie>> => apiService.get(urls.movies.base, {params: {page}}), //{params:{page}}
    getById: (id: number): IRes<IMovie> => apiService.get(urls.movies.movieById(id)),
    getByIdInfo: (id: number): IRes<IMovie> => apiService.get(urls.movieInfo.byId(id)),
    getByGenre: async (genreId: number, page: any): Promise<IPagination<IMovie>> => {
        try {
            const response = await apiService.get(urls.movies.moviesByGenre(genreId), {params: {page}});
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


}


export {
    movieService
}