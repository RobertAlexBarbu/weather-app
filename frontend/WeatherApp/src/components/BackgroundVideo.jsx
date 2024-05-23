import React from 'react';
import rainvideo from '../assets/rain.mp4';
import sunnyvideo from '../assets/sunny.mp4';
import cloudyvideo from '../assets/cloudy.mp4';
import sunnyandrainy from '../assets/sunnyandrainy.mp4';

function BackgroundVideo({ luminosity, isRaining }) {
    let video;
    if (isRaining) {
        if (luminosity === 'sunny') {
            video = sunnyandrainy;
        } else {
            video = rainvideo;
        }
    } else {
        video = luminosity === 'sunny' ? sunnyvideo : cloudyvideo;
    }

    return (
        <div className="bgContainer">
            <div className="overlay">
                <video src={video} autoPlay loop muted />
            </div>
        </div>
    );
}

export default BackgroundVideo;
