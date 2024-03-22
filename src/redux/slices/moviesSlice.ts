import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGenres, IMovie, IPagination, Video} from "../../interfaces";
import {AxiosError} from "axios";
import {movieService} from "../../services";
import {string} from "joi";

interface IState {
    movies:IMovie[],
    page:string,
    total_pages:number,
    total_results:number,
    info:IMovie[];
    vote_average:IMovie;
    movieForUpdate:IMovie;
    genre_ids:IMovie[];
    videos:Video[]
    [key:string]:IState[keyof IState];
    moviesByGenre: IMovie[];
    
}
const initialState:IState={
movies:[],
    page:null,
    total_pages:null,
    total_results:null,
    info:null,
    vote_average:null,
    movieForUpdate:null,
    genre_ids:[],
    videos:[],
    moviesByGenre: [],

}

const getAll=createAsyncThunk<IPagination<IMovie>, {page:any}>(
    'moviesSlice/getAll',
    async ({page},{rejectWithValue})=>{
        try {
            const {data}=await movieService.getAll(page)
            return data
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getInfo= createAsyncThunk<IMovie, {id:number}>(
    'moviesSlice/getInfo',
    async ({id}, {rejectWithValue})=>{
        try {
            const {data}=await movieService.getByIdInfo(id)
            return data
        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

// const getMoviesByGenre=createAsyncThunk<IPagination<IMovie>, {genreId:number, page:any}>(
//     'moviesSlice/getMoviesByGenre',
//     async ({genreId,page}, {rejectWithValue})=>{
//         try {
//             const {data}=await movieService.getByGenre(genreId,page)
//             return data
//         }catch (e) {
//             const err=e as AxiosError
//             return rejectWithValue(err.response.data)
//         }
//     }
// )
const getMoviesByGenre = createAsyncThunk(
    'movies/getByGenre',
    async ({ genreId, page }: { genreId: number; page: any }) => {
        try {
            const response = await movieService.getByGenre(genreId, { params: { page } })
            if (!response) {
                throw new Error('Failed to fetch movies by genre');
            }
            const data = await response.data;
            return data;
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            throw error;
        }
    }
);


const getMovieVideo = createAsyncThunk<string[], { id: number }>(
    'moviesSlice/getMovieVideo',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getById(id);
            // Повертаємо список ключів відео
            return data.results.map((video: any) => video.key);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// const getTotalPagesByGenre=createAsyncThunk<IPagination<IMovie>, {genreId:number}>(
//     'moviesSlice/getTotalPagesByGenre',
//     async ({genreId}, {rejectWithValue})=>{
//         try {
//             const {data}=await movieService.getTotalPagesByGenre(genreId)
//             return data
//         }catch (e) {
//             const err = e as AxiosError
//             return rejectWithValue(err.response.data)
//         }
//     }
// )

const moviesSlice=createSlice({
    name:'moviesSlice',
    initialState,
    reducers:{
        setMovieForUpdate:(state, action)=>{
            state.movieForUpdate=action.payload
        },
        setMoviesByGenre: (state, action) => {
            state.movies = action.payload.results;
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
            state.total_results = action.payload.total_results;
        },
        getMoviesByGenreSuccess(state, action: PayloadAction<IMovie[]>) {
            state.moviesByGenre = action.payload;
        },
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies=action.payload.results
                state.page=action.payload.page
                state.total_pages=action.payload.total_pages
                state.total_results=action.payload.total_results
            })
            .addCase(getMovieVideo.fulfilled, (state, action) => {
                // Прийняти дані, які отримано з getMovieVideo
                const videoKeys = action.payload;

            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
               state.movies=action.payload.results


            })
            // .addCase(getTotalPagesByGenre.fulfilled, (state, action) => {
            //     state.total_pages=action.payload.total_pages
            //     state.page=action.payload.page
            // })



            // .addCase(getMovieId.fulfilled, (state, action) => {
            //     state.genre_ids = action.payload.genre_ids; // Assuming payload contains genre ids
            // })
})

const {reducer:moviesReducer, actions}=moviesSlice

const moviesActions={
    ...actions,
    getAll,
    getInfo,
    getMoviesByGenre,
    getMovieVideo,

}

export {
    moviesActions,
    moviesReducer
}