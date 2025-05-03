import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function BackgroundVideo() {
  const videos = ['/assets/Dog.mp4', '/assets/Cat.mp4', '/assets/Rabbit.mp4'];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay was prevented:', error);
        });
      }
    }
  }, [currentVideoIndex]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh'}}>
      <video
        ref={videoRef}
        key={videos[currentVideoIndex]} // force reload on src change
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="relative flex flex-col items-center justify-center h-full text-white z-10">
        <h1 className="text-4xl font-bold">Every Paw Deserves a Hand</h1>
        <p className="text-lg mt-2">Explore beautiful souls ready to share the purest and simplest form of love.</p>
        <Link
          to={'/continue'}
          className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300"
        >
          Be Their Someone
        </Link>
      </div>

    </div>
  );
}

export default BackgroundVideo;
