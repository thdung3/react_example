import React, { useState } from 'react'
import './ImageCard.css'

const defaultImage = '/image/no-image-found.png'
export default function ImageCard(props) {
    let [isHover, setIsHover] = useState(false)
    const showInfo = () => {
        setIsHover(true)
    }
    const hideInfo = (event) => {
        setIsHover(false)
    }

    let fullUrl = `https://image.tmdb.org/t/p/original/${props.image}`

    if (!isHover) {
        return (
            <div className="col-md-3 card bg-dark text-white card-image-search" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img"
                    src={fullUrl || defaultImage}
                    alt="" />
            </div>
        )
    } else {
        return (
            <div className="col-md-3 card bg-dark text-white card-image-search" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                <img className="card-img card-search" src={fullUrl || defaultImage} alt="" />
                <div className="card-img-overlay car-search-title-area">
                    <h5 className="card-title">{props.title}</h5>
                    <p id="rate-score" className="card-text">Rate {props.rate}</p>
                    <p className="card-text">{props.descript}</p>
                </div>
            </div>
        )
    }
}
