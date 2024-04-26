import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import Navbar from './Navbar';
import { toggleMode } from './callexternalfunction';

function ResponsiveVideoPlayer() {
  // Setting up the initial states using
  // react hook 'useState"
  const [mode, setMode] = useState("light");
  const [video, setVideo] = useState("inception");
  const [searchError, setSearchError] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [videoURLs, setVideoURLs] = useState([
    "https://youtu.be/sa9l-dTv9Gk", // Example URL
    "https://www.youtube.com/watch?v=Rwe5Aw3KPHY&pp=ygUZOGsgdmlkZW8gdWx0cmEgaGQgMjQwIGZwcw%3D%3D",
    "https://www.youtube.com/watch?v=HM44zVly_W8&pp=ygUZOGsgdmlkZW8gdWx0cmEgaGQgMjQwIGZwcw%3D%3D",
    "https://www.youtube.com/watch?v=9EajE9VzFKA&pp=ygUZOGsgdmlkZW8gdWx0cmEgaGQgMjQwIGZwcw%3D%3D",
    "https://www.youtube.com/watch?v=PhAsdlmY0o8&pp=ygUZOGsgdmlkZW8gdWx0cmEgaGQgMjQwIGZwcw%3D%3D",
    // "https://www.youtube.com/watch?v=ix6pVdZ5Ynk&pp=ygUZOGsgdmlkZW8gdWx0cmEgaGQgMjQwIGZwcw%3D%3D" // Example URL
  ]);

  // A function to fetch the required URL
  // and storing it inside the
  // videoURL state variable
  function handleSearch() {
    movieTrailer(video).then((res) => {
      setVideoURLs([res, ...videoURLs]); // Prepend the new URL to the existing list
    });
  }

  function handleClear() {
    setVideo("");
    setVideoURLs([]);
    setSearchError(false);
    setButtonClicked(false); // Reset button clicked state
  }

  return (
    <>
    <Navbar className='mb-4' title="TextUtils" mode={mode} toggleMode={toggleMode} />
    <div className="responsive-video-player" style={{ backgroundImage: `url(Movies.jpg)`, height: '606px' }}>
      <div className="search-box">
        <label style={{ color: 'white' }}>Search for any movies/shows: </label>

        <input type="text" onChange={(e) => { setVideo(e.target.value) }} />
        <button onClick={() => { handleSearch() }}>Search</button>
      </div>
      <span>&nbsp;</span>
      <button onClick={handleClear}>Clear</button> {/* Clear button */}


      {/* Display search error message */}
      {searchError && <div className="search-error">No Search Record found</div>}

      {/* Render multiple ReactPlayer components */}
      <div className="video-container">
        {videoURLs.map((url, index) => (
          <ReactPlayer key={index} url={url} controls={true} width="100%" />
        ))}
      </div>
    </div>
    </>
  );
}


export default ResponsiveVideoPlayer;
