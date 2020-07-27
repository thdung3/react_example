import React, { useState, useEffect } from 'react';
import './App.css';
import ImageCard from './components/ImageCard'
import Nav from './components/NavBar'
import BackGround from './components/BackGround'
import CarouselMovie from './components/CarouselMovie'
import Spinner from './components/Spinner'
import Pagination from "react-js-pagination";
import FilterBoard from './components/FilterBoard'
const apiKey = process.env.REACT_APP_API_KEY

function App() {
    let [isReady, setIsReady] = useState(false)
    // Page: home, search
    let [page, setPage] = useState('home')
    let [genresList, setGenresList] = useState([])
    let [resultSearch, setResultSearch] = useState(null)
    let [movieListSearch, setMovieListSearch] = useState(null)
    let [resultSearchOriginal, setResultSearchOriginal] = useState(null)
    let [keyWordSearch, setKeyWordSearch] = useState('')
    let [movieListNowPlaying, setMovieListNowPaying] = useState(null)
    let [movieListTopRate, setMovieListTopRate] = useState(null)
    let [movieListPopular, setMovieListPopular] = useState(null)
    let [activePage, setActivePage] = useState(1);
    let [year, setYear] = useState({ min: 1980, max: 2020 })
    let [rate, setRate] = useState({ min: 0, max: 10 })
    const callNowPlayingApi = async () => {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
        let result = await fetch(url)
        let data = await result.json()
        setMovieListNowPaying(data.results)
        console.log('data:', data)
    }

    const callAllApi = async () => {
        await callApiGenre()
        await callNowPlayingApi()
        await callTopRateApi()
        await callPopularApi()
        setIsReady(true)
    }

    const callTopRateApi = async () => {
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
        let result = await fetch(url)
        let data = await result.json()
        setMovieListTopRate(data.results)
    }

    const callApiGenre = async () => {
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        let result = await fetch(url)
        let data = await result.json()
        setGenresList(data.genres)
    }

    const callPopularApi = async () => {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        let result = await fetch(url)
        let data = await result.json()
        setMovieListPopular(data.results)
    }

    const callSearchApi = async (keyWord, pageNum) => {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pageNum}&query=${keyWord}`
        let result = await fetch(url)
        let data = await result.json()
        setResultSearch(data)
        setMovieListSearch(data.results)
        console.log('callSearchApi:', data.results)
        setResultSearchOriginal(data.results)
    }

    const searchByKeyWord = async (keyWord) => {
        setKeyWordSearch(keyWord)
        await callSearchApi(keyWord)
        setPage('search')
    }

    const backHome = () => {
        setPage('home')
    }

    const handlePageChange = (pageNum) => {
        callSearchApi(keyWordSearch, pageNum);
        setActivePage(pageNum);
    };

    const filterByPopular = (type) => {
        let filterdMovieListSearch = []
        if (type === 'asc') {
            filterdMovieListSearch = resultSearchOriginal.sort((a, b) => {
                return (a.popularity - b.popularity)
            })
        } else {
            filterdMovieListSearch = resultSearchOriginal.sort((a, b) => {
                return (b.popularity - a.popularity)
            })
        }
        setMovieListSearch([...filterdMovieListSearch])
    }

    const filterByRating = (type) => {
        let filterdMovieListSearch = []
        if (type === 'asc') {
            filterdMovieListSearch = resultSearchOriginal.sort((a, b) => {
                return (a.vote_average - b.vote_average)
            })
        } else {
            filterdMovieListSearch = resultSearchOriginal.sort((a, b) => {
                return (b.vote_average - a.vote_average)
            })
        }
        setMovieListSearch([...filterdMovieListSearch])
    }

    const filterByYear = (value) => {
        console.log('filterByYear')
        let filteredMovie = resultSearchOriginal.filter((item) => {
            return ((parseInt(item.release_date.split('-')[0]) >= value.min) && (parseInt(item.release_date.split('-')[0]) <= value.max))
        })
        setYear(value)
        setMovieListSearch(filteredMovie)
    }

    const filterByRate = (value) => {
        console.log('filterByRate')
        let filteredMovie = resultSearchOriginal.filter((item) => {
            return (item.vote_average >= value.min && item.vote_average <= value.max)
        })
        setRate(value)
        setMovieListSearch(filteredMovie)
    }

    useEffect(() => {
        callAllApi()
    }, [])

    if (!isReady) {
        return <div>
            <Spinner />
        </div>
    }
    if (page === 'home') {
        return (
            <div className="App">
                <div className="container-fluix">
                    <Nav searchByKeyWord={searchByKeyWord} backHome={backHome} />
                    <BackGround />
                    <div className="top-movie-area">
                        <h3 id="top-rate-title" className="ml-5"> Top Rated </h3>
                        <CarouselMovie movieList={movieListTopRate} genresList={genresList} />
                    </div>

                    <div className="top-movie-area">
                        <h3 id="top-popular-title" className="ml-5"> Popular </h3>
                        <CarouselMovie movieList={movieListPopular} genresList={genresList} />
                    </div>

                    <div className="top-movie-area">
                        <h3 id="top-now-playing-title" className="ml-5"> Now Playing </h3>
                        <CarouselMovie movieList={movieListNowPlaying} genresList={genresList} />
                    </div>
                </div>
            </div>
        );
    }
    if (page === 'search') {
        return (
            <div className="background-seach">
                <Nav searchByKeyWord={searchByKeyWord} backHome={backHome} />
                <h5 className="result-search-title"> {keyWordSearch} has {resultSearch.total_results} results </h5>
                <div className="row">
                    <div className="col-2 filter-board-area">
                        <FilterBoard
                            year={year}
                            rate={rate}
                            filterByPopular={filterByPopular}
                            filterByRating={filterByRating}
                            filterByYear={filterByYear}
                            filterByRate={filterByRate}
                        />
                    </div>
                    <div className="col-10">
                        <div className="row seach-area">
                            {movieListSearch.map(item => {
                                let genres = item.genre_ids.map(itemGenre => genresList.find(genre => genre.id === itemGenre).name)
                                return (
                                    <ImageCard id={item.id} image={item.poster_path} title={item.title} descript={item.overview} rate={item.vote_average} genres={genres} />
                                )
                            })}
                        </div>
                        <div className="pagination-area">
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={resultSearch.total_results}
                                pageRangeDisplayed={5}
                                onChange={(pageNum) => handlePageChange(pageNum)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

