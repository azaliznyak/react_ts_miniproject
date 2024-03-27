import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useSearchParams} from "react-router-dom";

import css from "../components/MoviesContainer/MoviesList.module.css";
import {useAppDispatch, useAppSelector} from "../hooks";
import {moviesActions} from "../redux";
import {MovieSearch} from "../components";
import {IMovie} from "../interfaces";


const SearchPage = () => {
    const {reset, handleSubmit} = useForm<IMovie>({mode: 'all'})
    const dispatch = useAppDispatch()
    const {movies, total_pages} = useAppSelector(state => state.movies)
    const [query, setQuery] = useState('');
    const [query1, setQuery1] = useSearchParams({page: '1'});
    const page = query1.get('page')
    const [currentPage, setCurrentPage] = useState(1);
    // const [suggestions, setSuggestions] = useState<string[]>([]);


    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await dispatch(moviesActions.getSearch({query, page}));
            if (!response) {
                throw new Error('Failed to fetch suggestions');
            }
            // const data: any = response.payload
            //
            // setSuggestions(data.results);
        };

        fetchSuggestions();
    }, [query, dispatch, page]);


    const handleSearch: SubmitHandler<IMovie> = async () => {
        await dispatch(moviesActions.getSearch({query, page: +page}));


    };
//
//
    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
        reset()
    };

    const handleNextPage = async () => {
        setCurrentPage(currentPage + 1);
        await setQuery1({page: (currentPage + 1).toString()})
        await handleSearch(null);
    };

    const handlePrevPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            await setQuery1({page: (currentPage - 1).toString()});
            await handleSearch(null);
        }
    };
    // const moviesArr=movies.map((movie, index) => `${movie.title}-${index}`)


    return (
        <div className={css.SearchPage}>
            <form onSubmit={handleSubmit(handleSearch)} className={css.form}>
                <input className={css.input} type="text" placeholder={'Search film'} value={query}
                       onChange={handleInputChange}/>
                {/*<Autocomplete*/}
                {/*    options={moviesArr}*/}
                {/*    getOptionLabel={option=>option}*/}
                {/*    renderInput={(params) => (*/}
                {/*        <TextField*/}
                {/*            {...params}*/}
                {/*            label="Search film"*/}
                {/*            variant="outlined"*/}
                {/*            InputProps={{*/}
                {/*                ...params.InputProps,*/}
                {/*                placeholder: 'Search film',*/}
                {/*                value: query,*/}
                {/*                onChange: handleInputChange,*/}
                {/*            }}*/}
                {/*        />*/}

                {/*    )}*/}
                {/*    // onChange={handleSuggestionSelected}*/}
                {/*    // onChange={(event, newValue) => {*/}
                {/*    //     if (newValue && newValue.key !== undefined) {*/}
                {/*    //         handleSuggestionSelected(event, newValue.key);*/}
                {/*    //     }*/}
                {/*    // }}*/}
                {/*/>*/}
                {/*<Button variant="contained">Search</Button>*/}
                <button className={css.button}>Search</button>

            </form>
            <MovieSearch/>
            <div className={css.MoviesButton}>
                <button onClick={handlePrevPage}>Prev</button>
                <div>{page}</div>
                <button disabled={page === `${total_pages}` || movies.length === 0} onClick={handleNextPage}>Next
                </button>

            </div>
        </div>


    );
};

export {SearchPage};