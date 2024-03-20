import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie, IPagination} from "../../interfaces";
import {AxiosError} from "axios";
import {movieService} from "../../services";

interface IState {
    movies:IMovie[],
    page:number,
    total_pages:number,
    total_results:number
    
}
const initialState:IState={
movies:[],
    page:1,
    total_pages:null,
    total_results:null
}

const getAll=createAsyncThunk<IPagination<IMovie>, {page:number}>(
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
const moviesSlice=createSlice({
    name:'moviesSlice',
    initialState,
    reducers:{},
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies=action.payload.results
                state.page=action.payload.page
                state.total_pages=action.payload.total_pages
                state.total_results=action.payload.total_results
            })
})

const {reducer:moviesReducer, actions}=moviesSlice

const moviesActions={
    ...actions,
    getAll
}

export {
    moviesActions,
    moviesReducer
}