import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {MoviesPage} from "./pages";
import {MoviesInfoPage} from "./pages/MoviesInfoPage";

const router=createBrowserRouter([
    {
        path:'',  element:<MainLayout/>, children:[
            {
                index:true, element:<Navigate to={'movies'}/>
            },
            {
                path:'movies', element:<MoviesPage/>
            },
            {
                path:'movie/:id', element:<MoviesInfoPage/>
            }
        ]
    }
])

export {
    router
}