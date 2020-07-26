import React, { useState } from 'react'
import SoundButton from './SoundButton'

export default function BackGround() {
    let [muted, setMuted] = useState(true)

    const changeVolume = () => {
        if (muted) {
            document.getElementById('video-background').muted = false;
        } else {
            document.getElementById('video-background').muted = true;
        }
        setMuted(!muted)
    }
    return (
        <section id="background">
            <div className="overlay"></div>
            <div id="video-background-area">
                <video id="video-background" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                    <source src="videos/The Old Guard - Official Trailer - Netflix.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="row text-description">
                <div className="text-description-area col-sm-4 ml-5">
                    <div className="background-title-movie">
                        <p className="lead text-white text-top10">THE</p>
                        <h1 className="display-5 text-white">OLD GARD</h1>
                    </div>

                    <p className="lead text-white text-top10">#1 Vietnam today</p>
                    <p className="text-white">It uses utility classes for typography and spacing to space content out within the
                    larger container.</p>
                    <a className="btn btn-play" href="#" role="button"><i className="fas fa-play"></i> Play</a>
                    <a className="btn btn-info" href="#" role="button"><i className="fas fa-info-circle"></i> More
                    information
                </a>
                </div>
                <div className="col-sm-6"></div>
                {/* <div id="right-icon-area" className="col-sm-1"><i id="mute" className="fas fa-volume-mute"
                    onClick={() => changeVolume()}></i></div> */}
                <SoundButton muted={muted} changeVolume={changeVolume} />
            </div>

        </section>
    )
}
