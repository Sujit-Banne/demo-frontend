import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExistingPage.css'

function VideoGallery() {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllVideos, setShowAllVideos] = useState(false);

    const handleThumbnailClick = (videoId) => {
        const selectedVideo = videoList.find(video => video._id === videoId);
        setSelectedVideoId(selectedVideo.video_path);
    };

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

    const filteredVideoList = videoList.filter((video) => {
        return video.upload_title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const videos = filteredVideoList.map((video) => {
        return (
            <div
                className="video-container"
                key={video._id}
                onClick={() => handleThumbnailClick(video._id)}
            >
                <div className="video-thumbnail">
                    <img src={video.thumbnail_path} alt="video thubmnail" key={video._id} />
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

    const toggleViewAll = () => {
        setShowAllVideos(!showAllVideos);
    };

    const displayedVideos = showAllVideos ? videos : videos.slice(0, 4);

    return (
        <>
            <div className="navbar">
                <img src="./images/logo.PNG" alt="logo" className="logo" />
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by video title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="button">
                    <button className="login-button" onClick={() => navigate('/signin')}>
                        Login
                    </button>
                    <span className="navbar-separator">|</span>
                    <button className="register-button" onClick={() => navigate('/signup')}>
                        Register
                    </button>
                </div>
            </div>
            <div className="carousel">
                <img src="./images/crousel.png" alt="img" className='poster' />
            </div>
            <div className="container">
                <h4 className='togglebar'>Recent

                    {filteredVideoList.length >= 4 && (
                        <button className="toggle-button" onClick={toggleViewAll}>
                            {showAllVideos ? 'View Less' : 'View All'}
                        </button>
                    )}
                </h4>

                <div className="videos-container">
                    {displayedVideos}
                </div>

                {selectedVideoId && (
                    <div className="selected-video">
                        <video src={selectedVideoId} controls />
                    </div>
                )}
            </div>
        </>
    );
}

export default VideoGallery;
