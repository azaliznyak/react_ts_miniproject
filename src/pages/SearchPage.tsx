import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import css from "../components/MoviesContainer/MoviesList.module.css";
import {useAppDispatch} from "../hooks";
import {moviesActions} from "../redux";
import {useSearchParams} from "react-router-dom";

const SearchPage = () => {
    const {reset} = useForm({mode: 'all'})
    const dispatch=useAppDispatch()
    const [query, setQuery] = useState('');
    const {page}=useSearchParams();
    useEffect(()=>{
        const handleSearch = async () => {
            const data = await dispatch(moviesActions.getSearch());
            // if (data) {
            //     setResults(data.results);
            //
            // }


        };
        handleSearch()
    },[])
    return (
            <div className={css.SearchPage}>
                <div className={css.form}>
                    {/*<input className={css.input} type="text" placeholder={'Search film'} value={query}*/}
                    {/*       onChange={handleInputChange}/>*/}
                    {/*<button className={css.button} onClick={handleSearch}>Search</button>*/}

                </div>
                {/*<MovieSearch results={results} />*/}


                Search
            </div>





    );
};

export {SearchPage};