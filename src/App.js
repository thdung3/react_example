import React, { useState, useEffect } from 'react';
import './App.css';
import ImageCard from './components/ImageCard'
import Nav from './components/NavBar'
import BackGround from './components/BackGround'
import CarouselMovie from './components/CarouselMovie'
import Spinner from './components/Spinner'
import Pagination from "react-js-pagination";
const apiKey = process.env.REACT_APP_API_KEY

function App() {
    let [isReady, setIsReady] = useState(false)
    // Page: home, search
    let [page, setPage] = useState('home')
    let [resultSearch, setResultSearch] = useState(null)
    let [keyWordSearch, setKeyWordSearch] = useState('')
    let [movieListNowPlaying, setMovieListNowPaying] = useState(null)
    let [movieListTopRate, setMovieListTopRate] = useState(null)
    let [movieListPopular, setMovieListPopular] = useState(null)
    let [activePage, setActivePage] = useState(1);
    const callNowPlayingApi = async () => {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
        let result = await fetch(url)
        let data = await result.json()
        setMovieListNowPaying(data.results)
        console.log('data:', data)
    }

    const callAllApi = async () => {
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

    useEffect(
        callAllApi()
        , [])

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
                        <CarouselMovie movieList={movieListTopRate} />
                    </div>

                    <div className="top-movie-area">
                        <h3 id="top-popular-title" className="ml-5"> Popular </h3>
                        <CarouselMovie movieList={movieListPopular} />
                    </div>

                    <div className="top-movie-area">
                        <h3 id="top-now-playing-title" className="ml-5"> Now Playing </h3>
                        <CarouselMovie movieList={movieListNowPlaying} />
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
                <div className="row seach-area">
                    {resultSearch.results.map(item => {
                        return (
                            <ImageCard image={item.poster_path} title={item.title} descript={item.overview} rate={item.vote_average} />
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
        )
    }
}

export default App;

