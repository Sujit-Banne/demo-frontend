import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function DemoVideosPage() {
    const [searchText, setSearchText] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Do something with the search text, such as searching for videos
    };

    return (
        <div>
            <nav>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
            <h1>Demo Videos</h1>
            <div>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    controls={true}
                    width="640px"
                    height="360px"
                />
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=8YjFbMbfXaQ"
                    controls={true}
                    width="640px"
                    height="360px"
                />
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=vTIIMJ9tUc8"
                    controls={true}
                    width="640px"
                    height="360px"
                />
            </div>
        </div>
    );
}

export default DemoVideosPage;
