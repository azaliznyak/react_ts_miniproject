import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IGenres} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services/genresService";

interface IState {
    genresMovies:IGenre[]
}
const initialState:IState={
genresMovies:[]
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

const genresSlice=createSlice({
    name:'genresSlice',
    initialState,
    reducers:{},
    extraReducers:builder =>
        builder
            .addCase(getAllGenres.fulfilled,(state, action) => {
                state.genresMovies=action.payload.genres
            })

})

const {reducer:genresReducer, actions}=genresSlice

const genresActions={
    ...actions,
    getAllGenres
}

export {
    genresActions,
    genresReducer
}