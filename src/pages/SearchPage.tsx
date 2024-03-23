import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import css from "../components/MoviesContainer/MoviesList.module.css";
import {useAppDispatch, usePageQuery} from "../hooks";
import {moviesActions} from "../redux";
import {useSearchParams} from "react-router-dom";
import {MovieSearch} from "../components";

const SearchPage = () => {
    const {reset} = useForm({mode: 'all'})
    const dispatch=useAppDispatch()
    const [query, setQuery] = useState('');
    const [query1, setQuery1] =useSearchParams({page:'1'});
    const page=query1.get('page')
    const [currentPage, setCurrentPage] = useState(1);


        const handleSearch = async () => {
            const data = await dispatch(moviesActions.getSearch({query,page:+page}));
            console.log(data)


        };
        const handleInputChange = (event:any) => {
            setQuery(event.target.value);
            reset()
        };

        const handleNextPage = async () => {
            setCurrentPage(currentPage + 1);
            await setQuery1({ page: (currentPage + 1).toString() })
            await handleSearch();
        };

        const handlePrevPage = async () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await setQuery1({ page: (currentPage - 1).toString() });
                await handleSearch();
            }
        };



    return (
            <div className={css.SearchPage}>
                <div className={css.form}>
                    <input className={css.input} type="text" placeholder={'Search film'} value={query} onChange={handleInputChange}/>
                     <button className={css.button} onClick={handleSearch}>Search</button>

                </div>
                <MovieSearch/>
                <div className={css.MoviesButton}>
                    <button onClick={handlePrevPage}>Prev</button>
                    <div>{page}</div>
                    <button onClick={handleNextPage}>Next</button>

                </div>
            </div>





    );
};

export {SearchPage};