import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import VideoPlayer from '../VideoPlayer/videoPlayer';

function Dashboard() {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const tokenTime = JSON.parse(localStorage.getItem('userTokenTime'));
        if (tokenTime) {
            axios
                .get('/api/videolist', {
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

    const handleThumbnailClick = (videoUrl, videoId) => {
        setSelectedVideoUrl(videoUrl);
        setSelectedVideoId(videoId);
    };

    const handleCloseClick = () => {
        setSelectedVideoUrl(null);
        setSelectedVideoId(null);
    };

    const handleDeleteClick = (videoId) => {
        const tokenTime = JSON.parse(localStorage.getItem('userTokenTime'));
        if (tokenTime) {
            axios
                .delete(`/api/videos/${videoId}`, {
                    headers: {
                        Authorization: 'Bearer ' + tokenTime.token,
                    },
                })
                .then(() => {
                    // Remove the deleted video from the video list
                    setVideoList((prevList) =>
                        prevList.filter((video) => video._id !== videoId)
                    );

                    // Clear the selected video if the deleted video is the currently selected one
                    if (selectedVideoId === videoId) {
                        setSelectedVideoUrl(null);
                        setSelectedVideoId(null);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const filteredVideoList = videoList.filter((video) => {
        return video.upload_title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const videos = filteredVideoList.map((video) => {
        return (
            <>
                <div
                    className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
                    key={video._id}
                    onClick={() => handleThumbnailClick(video.video_path, video._id)}
                >
                    <div className="video-thumbnail">
                        <img src={video.thumbnail_path} alt="video thubmnail" key={video._id} />
                    </div>
                    <span className="username">
                        {/* <Link to={'/api/videos/' + video.upload_title}> */}
                        {video.uploader_name}
                        {/* </Link> */}
                    </span>
                    <span className="video-title">
                        {video.upload_title.replace(/_/g, ' ')}
                    </span>
                </div>
            </>
        );
    });

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h4>Videos</h4>
                <hr className="my-4" />

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by video title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {selectedVideoUrl ? (
                    <div className="selected-video">
                        <VideoPlayer videoUrl={selectedVideoUrl} />
                        <div className="button-group">
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteClick(selectedVideoId)}
                            >
                                Delete
                            </button>
                            <button className="close-button" onClick={handleCloseClick}>
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="streams row">{videos}</div>
                )}
            </div>
        </>
    );

}

export default Dashboard;