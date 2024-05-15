import React from 'react';
import rainvideo from '../assets/rain.mp4';
import sunnyvideo from '../assets/sunny.mp4';

function BackgroundVideo({ isRaining }) {
    const video = isRaining ? rainvideo : sunnyvideo;

    return (
        <div className="bgContainer">
            <div className="overlay">
                <video src={video} autoPlay loop muted />
            </div>
        </div>
    );
}

export default BackgroundVideo;
