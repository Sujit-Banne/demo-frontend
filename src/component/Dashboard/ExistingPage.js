import React, { useState } from "react";
import { Link } from "react-router-dom";

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
                <Link to="/">Home</Link>
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
                <video
                    title="Demo Video 1"
                    description="This is a demo video 1."
                    duration="5:30"
                    videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
                <video
                    title="Demo Video 2"
                    description="This is a demo video 2."
                    duration="2:45"
                    videoUrl="https://www.youtube.com/watch?v=8YjFbMbfXaQ"
                />
                <video
                    title="Demo Video 3"
                    description="This is a demo video 3."
                    duration="4:15"
                    videoUrl="https://www.youtube.com/watch?v=vTIIMJ9tUc8"
                />
            </div>
        </div>
    );
}

export default DemoVideosPage;
