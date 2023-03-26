import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './component/form/SignIn/SignIn';
import SignUp from './component/form/SignUp/SignUp';
import Dashboard from './component/Dashboard/Dashboard';
import Upload from './component/Upload/Upload';
import VideoPlayer from './component/VideoPlayer/videoPlayer';
import MyVideos from './component/Dashboard/My-videos';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/signin" element={<SignIn />} />
        <Route exact="true" path="/signup" element={<SignUp />} />
        <Route exact="true" path="/" element={<Dashboard />} />
        <Route exact="true" path="/upload" element={<Upload />} />
        <Route exact="true" path="/videos" element={<VideoPlayer />} />
        <Route exact="true" path="/myvideos" element={<MyVideos />} />
      </Routes>
    </Router>
  );
}
export default App;
