import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IGenres, IMovie} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    genresMovies:IGenre[];
    genre_ids:IMovie[];
}
const initialState:IState={
genresMovies:[],
    genre_ids:[],
};
const getAllGenres=createAsyncThunk<IGenres<IGenre>, void>(
    'genresSlice/getAllGenres',
    async (_,{rejectWithValue})=>{
        try {
            const {data}=await genreService.getAll()
            return data

        }catch (e) {
            const err=e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


 const getGenresByIds=createAsyncThunk<IGenre, {id:number}>(
     'genresSlice/getGenresByIds',
         async ({id}, {rejectWithValue})=>{
         try {
             await genreService.getById(id)

         }catch (e) {
             const err =e as AxiosError
             return rejectWithValue(err.response.data)
         }
         }
)

const genresSlice=createSlice({
    name:'genresSlice',
    initialState,
    reducers:{},
    extraReducers:builder =>
        builder
            .addCase(getAllGenres.fulfilled,(state, action) => {

                state.genresMovies=action.payload.genres;


            })
            .addCase(getGenresByIds.fulfilled, (state, action) => {

            })

})

const {reducer:genresReducer, actions}=genresSlice

const genresActions={
    ...actions,
    getAllGenres,
    getGenresByIds

}

export {
    genresActions,
    genresReducer
}