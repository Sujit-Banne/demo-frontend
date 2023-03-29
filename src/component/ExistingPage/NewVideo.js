import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import LOGO from '../logo.PNG'

import './NewVideo.css'

function NewVideo() {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoPath, setSelectedVideoPath] = useState(state.video_path);

    // Make API request to fetch video data
    useEffect(() => {
        axios.get('/api/existingvideo')
            .then((response) => {
                setVideoList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleThumbnailClick = (videoPath) => {
        setSelectedVideoPath(videoPath);
    }

    const videos = videoList.map((video) => {
        return (

            <div
                className="video-container"
                key={video._id}
                onClick={() => handleThumbnailClick(video.video_path)}
            >
                <div className="video-thumbnail">
                    <img src={video.thumbnail_path} alt="video thumbnail" key={video._id} />
                </div>
                <div className="video-details">
                    <span className="username">
                        {video.uploader_name}
                    </span>
                    <span className="video-title">
                        {video.upload_title.replace(/_/g, ' ')}
                    </span>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="navbar">
                <img src={LOGO} alt=" logo" className="logo" onClick={() => navigate('/')} />
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by video title"
                    />
                </div>
                <div>
                    <button className="login" onClick={() => navigate("/signin")}>
                        Login
                    </button>
                    <span className="navbar-separator">|</span>
                    <button className="register-signup" onClick={() => navigate("/signup")}>
                        Register
                    </button>
                </div>
            </div>
            <video src={selectedVideoPath} controls className='newvideo-video'></video>
            <div className="videos-container">
                {videos}
            </div>
        </>
    )
}

export default NewVideo;
