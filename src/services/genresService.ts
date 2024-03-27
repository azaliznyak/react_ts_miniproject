import {urls} from "../constants";
import {apiService} from "./apiService";
import {IRes} from "../types";
import {IGenre, IGenres} from "../interfaces";

const genreService = {
    getAll: (): IRes<IGenres<IGenre>> => apiService.get(urls.genres.base),
    getById: (ids: number): IRes<IGenre> => apiService.get(urls.genres.byId(ids))
}

export {
    genreService
}