// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../Navbar/Navbar';
// // import './MyVideos.css';
// import VideoPlayer from '../VideoPlayer/videoPlayer';
// import { useNavigate } from 'react-router-dom';


// function MyVideos() {
//     const [videoList, setVideoList] = useState([]);
//     const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
//     const [selectedVideoId, setSelectedVideoId] = useState(null);
//     const navigate = useNavigate();


//     const tokenTime = JSON.parse(localStorage.getItem('userTokenTime'));
//     useEffect(() => {
//         console.log('tokenTime:', tokenTime);
//         if (tokenTime) {
//             axios.get(`/api/myvideos/${tokenTime.id}`, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: 'Bearer ' + tokenTime.token,
//                 },
//             })
//                 .then((res) => {
//                     setVideoList(res.data);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     navigate('/signin');
//                 });
//         } else {
//             navigate('/signin');
//         }
//     }, [navigate]);


//     const handleThumbnailClick = (videoUrl, videoId) => {
//         setSelectedVideoUrl(videoUrl);
//         setSelectedVideoId(videoId);
//     };

//     const handleCloseClick = () => {
//         setSelectedVideoUrl(null);
//         setSelectedVideoId(null);
//     };

//     const videos = videoList.map((video) => {
//         if (!video) {
//             return null;
//         }
//         return (
//             <>
//                 <div
//                     className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
//                     key={video._id}
//                     onClick={() => handleThumbnailClick(video.video_path, video._id)}
//                 >
//                     <div className="video-thumbnail">
//                         <img src={video.thumbnail_path} alt="video thubmnail" />
//                     </div>
//                     <span className="username">
//                         {video.uploader_name}
//                     </span>
//                     <span className="video-title">
//                         {video.upload_title.replace(/_/g, ' ')}
//                     </span>
//                 </div>
//             </>
//         );
//     });

//     return (
//         <>
//             <Navbar />
//             <div className="container mt-5">
//                 <h4>My Videos</h4>
//                 <p>Token Time: {JSON.stringify(tokenTime)}</p>
//                 <hr className="my-4" />

//                 {selectedVideoUrl ? (
//                     <div className="selected-video">
//                         <VideoPlayer videoUrl={selectedVideoUrl} />
//                         <div className="button-group">
//                             <button className="close-button" onClick={handleCloseClick}>
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="streams row">{videos}</div>
//                 )}
//             </div>
//         </>
//     );

// }

// export default MyVideos;
