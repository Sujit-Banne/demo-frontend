// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../Navbar/Navbar'

// const MyVideos = ({ uploader_name }) => {
//     const [videos, setVideos] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const token = JSON.parse(localStorage.getItem('userTokenTime')); // get the authorization token
//                 if (!token) {
//                     throw new Error('No token found');
//                 }
//                 const response = await axios.get(`/api/user_upload/${localStorage.getItem("uploader_name")}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setVideos(response.data.contacts);
//                 console.log(response);
//             } catch (err) {
//                 if (err.response && err.response.data && err.response.data.message) {
//                     setError(err.response.data.message);
//                 } else {
//                     setError('An error occurred. Please try again later.');
//                 }
//             }
//         };
//         fetchVideos();
//     }, [uploader_name]);


//     return (
//         <div>
//             <Navbar />
//             <h1>My Videos</h1>
//             {videos.map((video) => (
//                 <div key={video._id}>
//                     <h2>{video.upload_title}</h2>
//                     <div className="video-thumbnail">
//                         <img src={video.thumbnail_path} alt="video thubmnail" key={video._id} />
//                     </div>
//                 </div>
//             ))}
//             {error && <div>{error}</div>}
//         </div>
//     );
// };

// export default MyVideos;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

const MyVideos = ({ uploader_name }) => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userTokenTime')); // get the authorization token
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`/api/user_upload/${localStorage.getItem("uploader_name")}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVideos(response.data.contacts);
                console.log(response);
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

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
    }

    return (
        <div>
            <Navbar />
            <h1>My Videos</h1>
            {videos.map((video) => (
                <div key={video._id}>
                    <h2>{video.upload_title}</h2>
                    <div className="video-thumbnail" onClick={() => handleThumbnailClick(video)}>
                        <img src={video.thumbnail_path} alt="video thubmnail" key={video._id} />
                    </div>
                </div>
            ))}
            {selectedVideo && (
                <div>
                    <video src={selectedVideo.video_path} controls autoPlay />
                </div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
};

export default MyVideos;
