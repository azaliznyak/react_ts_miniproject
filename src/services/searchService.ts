import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IPagination} from "../interfaces";

const searchService={
    searchMovies: async (query:string, page = '1'):Promise<IPagination<IMovie>> => {
        try {
            const response = await apiService.get(urls.search.base, { params: { query, page } });
            if (!response) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.data;
            return data;
        } catch (error) {
            console.error('Error searching movies:', error);
            return null;
        }
    }
}

export {
    searchService
}