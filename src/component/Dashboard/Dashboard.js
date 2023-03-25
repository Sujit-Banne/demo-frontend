// Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Dashboard.css';
import VideoPlayer from '../VideoPlayer/videoPlayer';

function Dashboard() {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

    useEffect(() => {
        const tokenTime = JSON.parse(localStorage.getItem('userTokenTime'));
        if (tokenTime) {
            axios
                .get('/api/videoList', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + tokenTime.token,
                    },
                })
                .then((res) => {
                    setVideoList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    navigate('/signin');
                });
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const handleThumbnailClick = (videoUrl) => {
        setSelectedVideoUrl(videoUrl);
    };

    const handleCloseClick = () => {
        setSelectedVideoUrl(null);
    };

    const videos = videoList.map((video) => {
        return (
            <div
                className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
                key={video._id}
                onClick={() => handleThumbnailClick(video.video_path)}
            >
                <div className="video-thumbnail">
                    <img src={video.thumbnail_path} alt="video thubmnail" />
                </div>
                <span className="username">
                    <Link to={'/api/videos/' + video.upload_title}>
                        {video.uploader_name}
                    </Link>
                </span>
                <span className="video-title">
                    {video.upload_title.replace(/_/g, ' ')}
                </span>
            </div>
        );
    });

    return (
        <React.Fragment>
            <div className="container mt-5">
                <h4>Videos</h4>
                <hr className="my-4" />

                {selectedVideoUrl ? (
                    <div className="selected-video">
                        <VideoPlayer videoUrl={selectedVideoUrl} />
                        <button className="close-button" onClick={handleCloseClick}>
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="streams row">{videos}</div>
                )}
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
