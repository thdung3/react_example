import React from 'react'

export default function ImageCard(props) {
    console.log('ImageCard.props:', props)

    let fullUrl = `https://image.tmdb.org/t/p/original/${props.image}`
    // let fullUrl = 'https://image.tmdb.org/t/p/original/'+ props.image 
    return (
        < div className="card col-md-4" >
            <img className="card-img-top"
                src={fullUrl}
                alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.descript}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div >
    )
}
