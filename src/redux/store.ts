import {configureStore} from "@reduxjs/toolkit";

import {loadingReducer, moviesReducer} from "./slices";
import {genresReducer} from "./slices";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
        loading: loadingReducer
    }
})

export {
    store
}