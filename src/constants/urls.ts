const baseURL='https://api.themoviedb.org/3';

const movies='/discover/movie';
const genres='/genre/movie/list';
const movieInfo='/movie';
const search='/search/movie'

const urls={
    movies:{
        base:movies,
        byId:(id:number):string=>`${movies}/${id}`,
        moviesByGenre:(genreId:number):string=>`${movies}?with_genres=${genreId}&`
    },
    movieInfo:{
        byId:(id:number):string=>`${movieInfo}/${id}`
    },
    genres:{
        base: genres,
        byId:(id:number):string=>`${genres}/${id}`
    },
    search:{
        base:search
    }
}

export {
    baseURL,
    urls
}