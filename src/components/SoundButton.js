import React from 'react'

export default function SoundButton(props) {
    if (props.muted) {
        return (
            <div id="right-icon-area" className="col-sm-1">
                <i id="mute" className="fas fa-volume-up" onClick={() => props.changeVolume()}></i>
            </div>
        )
    } else {
        return (
            <div id="right-icon-area" className="col-sm-1">
                <i id="mute" className="fas fa-volume-mute" onClick={() => props.changeVolume()}></i>
            </div>
        )
    }
}
