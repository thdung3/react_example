let muted = true
export const changeVolume = () => {
    console.log('muted:', muted)
    console.log('video background:', document.getElementById('right-icon-area').innerHTML)
    if (muted) {
        // document.getElementById('video-background-area').innerHTML = `
        // <video id="video-background" playsinline="playsinline" autoplay="autoplay" loop="loop">
        //         <source src="videos/The Old Guard - Official Trailer - Netflix.mp4" type="video/mp4">
        //     </video>
        //     `
        document.getElementById('video-background').muted = false;
        document.getElementById('right-icon-area').innerHTML = `
        <div id="right-icon-area" class="col-sm-1">
            <i id="mute" class="fas fa-volume-up" onclick={() => changeVolume()}></i>
        </div>
        `
        muted = false;
    } else {
        document.getElementById('video-background').muted = true;
        document.getElementById('right-icon-area').innerHTML = `
        <div id="right-icon-area" class="col-sm-1">
            <i id="mute" class="fas fa-volume-mute" onClick={() => changeVolume()}></i>
        </div>
        `
        muted = true;
    }

}