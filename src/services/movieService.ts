import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";

const movieService={
    getAll:(page:number):IRes<IPagination<IMovie>> =>apiService.get(urls.movies.base, {params:{page}} ) , //{params:{page}}
    getById:(id:number):IRes<IMovie> =>apiService.get(urls.movies.byId(id)),
    getByIdInfo:(id:number):IRes<IMovie> =>apiService.get(urls.movieInfo.byId(id))
}


export {
    movieService
}