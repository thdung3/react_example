import React, { useState, useEffect } from 'react'
import './ImageCard.css'
import { Modal } from 'react-bootstrap'
const apiKey = process.env.REACT_APP_API_KEY

const defaultImage = '/image/img-not-found.jpg'
export default function ImageCard(props) {
    let [isHover, setIsHover] = useState(false)
    let [show, setShow] = useState(false);
    let [youtubeLink, setYoutubeLink] = useState(null)
    let [urlSrc, setUrlSrc] = useState(null)
    let fullUrl = defaultImage
    if (props.image !== null) {
        fullUrl = `https://image.tmdb.org/t/p/original/${props.image}`
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showInfo = () => {
        setIsHover(true)
    }
    const hideInfo = (event) => {
        setIsHover(false)
    }

    const callApiGetVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
        let respone = await fetch(url)
        let data = await respone.json()
        setUrlSrc(fullUrl)
        if (data.videos.results.length > 0) {
            setYoutubeLink(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
            setUrlSrc(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
        }
    }

    let genreText = props.genres[0]
    for (let i = 1; i < props.genres.length; i++) {
        genreText += ' ° ' + props.genres[i]
    }



    useEffect(() => {
        callApiGetVideo()
    }, [])

    if (!isHover) {
        return (
            <div className="col-md-3 card bg-dark text-white card-image-search" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img"
                    src={fullUrl || defaultImage}
                    alt="" />
            </div>
        )
    } else if (youtubeLink !== null) {
        return (
            <div className="col-md-3 card bg-dark text-white card-image-search" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img card-search" src={fullUrl || defaultImage} alt="" />
                <div className="card-img-overlay car-search-title-area">
                    <h5 className="card-title">{props.title}</h5>
                    <p id="rate-score" className="card-text">Rate {props.rate}</p>
                    <p className="card-text">{genreText}</p>
                    <p id="btn-play-trailer" onClick={handleShow}><i className="fas fa-play"></i> Play </p>
                </div>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">{props.title}</Modal.Title>
                    </Modal.Header>
                    <div className="row">
                        <div className="col-sm-7 video-area">
                            <iframe width="480" height="360" src={urlSrc}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                        <div className="col-sm-4">
                            <p id="overview-title">Overview</p>
                            <Modal.Body>{props.descript}</Modal.Body>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return (
            <div className="col-md-3 card bg-dark text-white card-image-search" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img card-search" src={fullUrl || defaultImage} alt="" />
                <div className="card-img-overlay car-search-title-area">
                    <h5 className="card-title">{props.title}</h5>
                    <p id="rate-score" className="card-text">Rate {props.rate}</p>
                    <p className="card-text">{genreText}</p>
                    <p id="btn-play-trailer" onClick={handleShow}><i className="fas fa-play"></i> Play </p>
                </div>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">{props.title}</Modal.Title>
                    </Modal.Header>
                    <div className="row">
                        <div className="col-sm-7 video-area">
                            <img className="card-img"
                                src={fullUrl || defaultImage}
                                alt="" />
                        </div>
                        <div className="col-sm-4">
                            <p id="overview-title">Overview</p>
                            <Modal.Body>{props.descript}</Modal.Body>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
