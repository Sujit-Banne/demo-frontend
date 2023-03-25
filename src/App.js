import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './component/form/SignIn/SignIn';
import SignUp from './component/form/SignUp/SignUp';
import Dashboard from './component/Dashboard/Dashboard';
import Upload from './component/Upload/Upload';
import VideoPlayer from './component/VideoPlayer/videoPlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/videos" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
