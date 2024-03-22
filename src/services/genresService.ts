import {urls} from "../constants";
import {apiService} from "./apiService";
import {IRes} from "../types";
import {IGenre, IGenres} from "../interfaces";

const genreService={
    getAll:():IRes<IGenres<IGenre>> =>apiService.get(urls.genres.base),
    getById:(id:number):IRes<IGenre>=>apiService.get(urls.genres.byId(id))
}

export {
    genreService
}