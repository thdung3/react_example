import React from 'react'
import ImageCardCarousel from './ImageCardCarousel'
import { Carousel } from 'react-bootstrap'
import './CarouselMovie.css'

export default function CarouselMovie(props) {
    return (
        <Carousel>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[0]} />
                    <ImageCardCarousel movie={props.movieList[1]} />
                    <ImageCardCarousel movie={props.movieList[2]} />
                    <ImageCardCarousel movie={props.movieList[3]} />
                    <ImageCardCarousel movie={props.movieList[4]} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[5]} />
                    <ImageCardCarousel movie={props.movieList[6]} />
                    <ImageCardCarousel movie={props.movieList[7]} />
                    <ImageCardCarousel movie={props.movieList[8]} />
                    <ImageCardCarousel movie={props.movieList[9]} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[10]} />
                    <ImageCardCarousel movie={props.movieList[11]} />
                    <ImageCardCarousel movie={props.movieList[12]} />
                    <ImageCardCarousel movie={props.movieList[13]} />
                    <ImageCardCarousel movie={props.movieList[14]} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[15]} />
                    <ImageCardCarousel movie={props.movieList[16]} />
                    <ImageCardCarousel movie={props.movieList[17]} />
                    <ImageCardCarousel movie={props.movieList[18]} />
                    <ImageCardCarousel movie={props.movieList[19]} />
                </div>
            </Carousel.Item>
        </Carousel>
    )
}