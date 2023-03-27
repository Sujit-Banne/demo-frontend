import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

const MyVideos = ({ uploader_name }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userTokenTime')); // get the authorization token
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`/api/${uploader_name}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVideos(response.data.contacts);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        };
        fetchVideos();
    }, [uploader_name]);


    return (
        <div>
            <Navbar />
            <h1>My Videos</h1>
            {videos.map((video) => (
                <div key={video._id}>
                    <h2>{video.title}</h2>
                </div>
            ))}
            {error && <div>{error}</div>}
        </div>
    );
};

export default MyVideos;
