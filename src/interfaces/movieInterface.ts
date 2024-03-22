export interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    genre_ids: [];
    results?: any[];
}

export interface Video {
    key:string
}