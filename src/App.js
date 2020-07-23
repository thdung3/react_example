import React, { useState, useEffect } from 'react';
import './App.css';
import ImageCard from './components/ImageCard'
const apiKey = process.env.REACT_APP_API_KEY

function App() {
    let [movieList, setMoveVieList] = useState(null)
    const callApiMoive = async () => {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&append_to_response=videos`
        let result = await fetch(url)
        let data = await result.json()
        setMoveVieList(data.results)
        console.log('data:', data)
    }

    useEffect(() => {
        callApiMoive()
    }, [])

    if (movieList === null) {
        return <div>
            <h1>Loading...</h1>`
        </div>
    }
    return (
        <div className="App">
            <div className="container-fluix border-red">
                <div className="row">
                    {movieList.map(item => {
                        return (
                            <ImageCard image={item.poster_path} title={item.title} descript={item.overview} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

// for  (let i = 0 ; i< movieList.length; i++) {
//     <ImageCard image={movieList[i].poster_path} title={movieList[i].title} descript={movieList[i].overview} />
// }

export default App;
