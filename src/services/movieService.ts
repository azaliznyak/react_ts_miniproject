import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";

const movieService={
    getAll:(page:number):IRes<IPagination<IMovie>> =>apiService.get(urls.movies.base, {params:{page}} ) , //{params:{page}}
    getMovieById:(id:number):IRes<IMovie> =>apiService.get(urls.movies.movieById(id)),
    getByIdInfo:(id:number):IRes<IMovie> =>apiService.get(urls.movieInfo.byId(id))
}


export {
    movieService
}