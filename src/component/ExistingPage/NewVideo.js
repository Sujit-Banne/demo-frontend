import React from 'react';
import { useLocation } from 'react-router';


function NewVideo() {
    const { state } = useLocation();
    console.log(state);
    return (
        <>
            <video src={state.video_path} controls></video>
        </>
    )
}

export default NewVideo