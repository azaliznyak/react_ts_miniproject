import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import css from "../components/MoviesContainer/MoviesList.module.css";
import {useAppDispatch, useAppSelector, usePageQuery} from "../hooks";
import {moviesActions} from "../redux";
import {useSearchParams} from "react-router-dom";
import {MovieSearch} from "../components";
import Autosuggest from 'react-autosuggest';
import {Autocomplete, TextField, Button} from "@mui/material";



const SearchPage = () => {
    const {reset} = useForm({mode: 'all'})
    const dispatch=useAppDispatch()
    const {movies }=useAppSelector(state => state.movies)
    const [query, setQuery] = useState('');
    const [query1, setQuery1] =useSearchParams({page:'1'});
    const page=query1.get('page')
    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);



    // const handleInputChange = (event: React.FormEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    //     setValue(newValue);
    // };
//-----------------------------------------------
//     const handleSearch = async () => {
//             const data = await dispatch(moviesActions.getSearch({query,page:+page}));
//             console.log(data)

        //
        // };
        //
        // const handleInputChange = (event:any) => {
        //     setQuery(event.target.value);
        //
        //     reset()
        // };
        //
        //
        // const handleNextPage = async () => {
        //     setCurrentPage(currentPage + 1);
        //     await setQuery1({ page: (currentPage + 1).toString() })
        //     await handleSearch();
        // };
        //
        // const handlePrevPage = async () => {
        //     if (currentPage > 1) {
        //         setCurrentPage(currentPage - 1);
        //         await setQuery1({ page: (currentPage - 1).toString() });
        //         await handleSearch();
        //     }
        // };

//------------------------------------
    useEffect(() => {
        // Ваша функція, яка отримує підказки для введеного запиту
        const fetchSuggestions = async () => {
            const response = await dispatch(moviesActions.getSearch({ query, page }));
            if (!response) {
                throw new Error('Failed to fetch suggestions');
            }
            const data:any = response.payload // Припускаючи, що відповідь містить список підказок

            setSuggestions(data.results);
        };

        fetchSuggestions();
    }, [query]);

    // const handleSuggestionSelected = (event:React.FormEvent<HTMLInputElement>, { suggestion }: { suggestion: any }) => {
    //     // setQuery(suggestion.title); // При виборі підказки встановлюємо значення запиту
    // };
    const handleSuggestionSelected = (event: any, newValue: any) => {
        if (newValue && newValue.title) {
            setQuery(newValue.title);
        }
    };
    const getSuggestionValue = (suggestion:any) => suggestion.title;

    const renderSuggestion = (suggestion:any) => <div>{suggestion.title}</div>;

//----------------------------------
    const handleSearch = async () => {
        const data = await dispatch(moviesActions.getSearch({query,page:+page}));
        console.log(data)


    };
//
//
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
                    <Autocomplete
                        options={movies.map(movie=>movie.title)}
                        getOptionLabel={option=>option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search film"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    placeholder: 'Search film',
                                    value: query,
                                    onChange: handleInputChange,
                                }}
                            />
                        )}
                        onChange={handleSuggestionSelected}
                    />
                    <Button variant="contained" onClick={handleSearch}>Save</Button>
                     {/*<button className={css.button} onClick={handleSearch}>Search</button>*/}

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