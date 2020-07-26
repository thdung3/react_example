import React, { useState, useEffect } from 'react'
import './ImageCardCarousel.css'
import YT from 'react-youtube'
const apiKey = process.env.REACT_APP_API_KEY;

export default function ImageCardCarousel(props) {
    let [isHover, setIsHover] = useState(false)
    let [youtubeLink, setYoutubeLink] = useState(null)
    let fullUrl = `https://image.tmdb.org/t/p/original/${props.movie.poster_path}`
    let year = (props.movie.release_date.split('-'))[0]

    const callApiGetVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
        let respone = await fetch(url)
        let data = await respone.json()
        if (data.videos.results.length > 0) {
            setYoutubeLink(data.videos.results[0].key)
        }
    }

    const showInfo = () => {
        setIsHover(true)
    }
    const hideInfo = (event) => {
        setIsHover(false)
        stopVideo(event)
    }

    // 2. This code loads the IFrame Player API code asynchronously.
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    let opts = {
        height: '250',
        width: '333',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            rel: 0,
            fs: 0,
            modestbranding: 1,
            autohide: 1,
            showinfo: 0
        },

    }

    // 4. The API will call this function when the video player is ready.
    const onPlayerReady = (event) => {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    // let done = false;
    // const onPlayerStateChange = (event) => {
    //     if (event.data === YT.PlayerState.PLAYING && !done) {
    //         setTimeout(stopVideo(event), 1000 * 60);
    //         done = true;
    //     }
    // }
    const stopVideo = (event) => {
        event.data = YT.PlayerState.ENDED;
    }

    useEffect(
        callApiGetVideo()
        , [])

    if (!isHover) {
        return (
            <div className="col-md-2 card bg-dark text-white card-carousel" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img card-carousel-img"
                    src={fullUrl}
                    alt="" />
            </div>
        )
    } else if (youtubeLink === null) {
        return (
            <div className="col-md-2 card bg-dark text-white card-carousel" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img card-carousel-img"
                    src={fullUrl}
                    alt="" />
                <div className="row card-img-inside-area">
                    <div id="card-img-title-area" className="card-img-overlay col-sm-10">
                        <h5 className="card-title">{props.movie.title}</h5>
                        <p id="rate-score" className="card-text">Rate {props.movie.vote_average}</p>
                        <p className="card-text">Year: {year}</p>
                    </div>
                    <div id="card-img-right-button" className="col-sm-2">
                        <i className="far fa-thumbs-up card-img-btn-right"></i>
                        <i className="far fa-thumbs-down card-img-btn-right"></i>
                        <i className="fas fa-plus card-img-btn-right"></i>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card bg-dark text-white card-carousel" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <div className="video-area">
                    <YT opts={opts} videoId={youtubeLink} onReady={onPlayerReady} onMouseLeave={hideInfo} />
                </div>
                <div className="row card-img-inside-area">
                    <div id="card-img-title-area" className="card-img-overlay col-sm-10">
                        <h5 className="card-title">{props.movie.title}</h5>
                        <p id="rate-score" className="card-text">Rate {props.movie.vote_average}</p>
                        <p className="card-text">Year: {year}</p>
                    </div>
                    <div id="card-img-right-button" className="col-sm-2">
                        <i className="far fa-thumbs-up card-img-btn-right"></i>
                        <i className="far fa-thumbs-down card-img-btn-right"></i>
                        <i className="fas fa-plus card-img-btn-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}


