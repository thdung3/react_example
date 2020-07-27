import React from 'react'
import ImageCardCarousel from './ImageCardCarousel'
import { Carousel } from 'react-bootstrap'
import './CarouselMovie.css'

export default function CarouselMovie(props) {
    return (
        <Carousel>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[0]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[1]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[2]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[3]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[4]} genresList={props.genresList} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[5]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[6]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[7]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[8]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[9]} genresList={props.genresList} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[10]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[11]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[12]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[13]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[14]} genresList={props.genresList} />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-area">
                <div className="row list-image-carousel">
                    <ImageCardCarousel movie={props.movieList[15]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[16]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[17]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[18]} genresList={props.genresList} />
                    <ImageCardCarousel movie={props.movieList[19]} genresList={props.genresList} />
                </div>
            </Carousel.Item>
        </Carousel>
    )
}