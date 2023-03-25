import React from "react";

function VideoPlayer(props) {
    return (
        <div>
            <video controls width="480" height="360">
                <source src={props.videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}
export default VideoPlayer