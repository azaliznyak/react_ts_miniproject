import {configureStore} from "@reduxjs/toolkit";
import {moviesReducer} from "./slices/moviesSlice";
import {genresReducer} from "./slices/genresSlice";

const store=configureStore({
    reducer:{
        movies:moviesReducer,
        genres:genresReducer
    }
})

export {
    store
}