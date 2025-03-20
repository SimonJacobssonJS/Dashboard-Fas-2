import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavHeader from './NavHeader'; // Import NavHeader
import Footer from './Footer'; // Import Footer

const TrendingSongs = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);

  const API_KEY = '5d59f399e2ed962b8a068f7ce1829c4e';
  const API_URL = `https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${API_KEY}&format=json`;

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTrendingSongs(data.tracks.track);
      } catch (error) {
        console.error('Error fetching trending songs:', error);
      }
    };

    fetchTrendingSongs();
  }, []);

  return (
    <div className='bg-gray-100'>
      {/* NavHeader */}
      <NavHeader />

      <main className='p-6 max-w-6xl mx-auto min-h-screen'>
        <div className='flex gap-6 flex-wrap md:flex-nowrap'>
          {/* Trending Songs Section */}
          <div className='bg-white p-6 rounded-2xl shadow-md w-full'>
            <h2 className='text-3xl font-bold mb-4 text-gray-800'>
              Trending Songs
            </h2>
            <ul className='grid grid-cols-1 gap-4'>
              {trendingSongs.map((song, index) => (
                <li key={index} className='border-b last:border-b-0 py-3'>
                  <p className='text-gray-700 font-medium'>
                    {song.name} -{' '}
                    <span className='text-gray-500'>{song.artist.name}</span>
                  </p>
                  <p className='text-gray-500'>Streams: {song.playcount}</p>
                  <Link
                    to={`/song/${song.name}`}
                    className='text-blue-500 hover:text-blue-700'>
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrendingSongs;
