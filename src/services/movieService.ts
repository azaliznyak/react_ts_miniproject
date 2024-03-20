import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IPagination} from "../interfaces";
import {IRes} from "../types";

const movieService={
    getAll:(page:number):IRes<IPagination<IMovie>> =>apiService.get(urls.movies.base, {params:{page}} )  //{params:{page}}
}


export {
    movieService
}