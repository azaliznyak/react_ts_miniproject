import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie, IPagination, Video} from "../../interfaces";
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
    [key:string]:IState[keyof IState]
    
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

// const getMovieId=createAsyncThunk<IMovie, {id:number}>(
//     'moviesSlice/getMovieId',
//     async ({id}, {rejectWithValue})=>{
//         try {
//             const {data}=await movieService.getMovieById(id)
//             return data
//
//         }catch (e) {
//             const err=e as AxiosError
//             return rejectWithValue(err.response.data)
//         }
//     }
// )
const getMovieVideo = createAsyncThunk<string[], { id: number }>(
    'moviesSlice/getMovieVideo',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getMovieById(id);
            // Повертаємо список ключів відео
            return data.results.map((video: any) => video.key);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const moviesSlice=createSlice({
    name:'moviesSlice',
    initialState,
    reducers:{
        setMovieForUpdate:(state, action)=>{
            state.movieForUpdate=action.payload
        }
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
                const videoKeys=action.payload
            })

            // .addCase(getMovieId.fulfilled, (state, action) => {
            //     state.genre_ids = action.payload.genre_ids; // Assuming payload contains genre ids
            // })
})

const {reducer:moviesReducer, actions}=moviesSlice

const moviesActions={
    ...actions,
    getAll,
    getInfo,
    getMovieVideo
}

export {
    moviesActions,
    moviesReducer
}