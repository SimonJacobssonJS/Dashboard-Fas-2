import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import { useState } from 'react';

function TopSongs() {
  const [selectedSong, setSelectedSong] = useState(null);

  // Samla alla låtar från alla användare i en enda array
  const allSongs = mockData.users.flatMap((user) => user.topSongs);

  // Sortera låtarna från mest till minst streams
  const sortedSongs = allSongs.sort((a, b) => b.streams - a.streams);

  // Hantera när en låt väljs
  const handleSongClick = (song) => {
    setSelectedSong(song);
    console.log(`Selected song: ${song.song} by ${song.artist}`);
  };

  return (
    <>
      <NavHeader />
      <div className='p-4'>
        <h2 className='text-2xl text-secondary font-bold mb-4'>Top Songs</h2>
        <ul className='list-decimal pl-5 text-tertiary'>
          {sortedSongs.map((songObj, index) => (
            <li key={index} className='py-2 border-b border-gray-300'>
              <button
                onClick={() => handleSongClick(songObj)}
                onKeyDown={(e) => e.key === 'Enter' && handleSongClick(songObj)}
                className='text-left w-full font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 p-2 rounded-md transition'
                tabIndex='0'
                aria-label={`Play ${songObj.song} by ${songObj.artist}, ${songObj.streams} streams`}>
                {songObj.song} - {songObj.artist} ({songObj.streams} streams)
              </button>
            </li>
          ))}
        </ul>

        {/* Visar vald låt */}
        {selectedSong && (
          <div className='mt-4 p-4 bg-gray-100 rounded-md'>
            <h3 className='text-xl font-semibold'>{selectedSong.song}</h3>
            <p className='text-gray-600'>{selectedSong.artist}</p>
            <p className='text-gray-500'>Streams: {selectedSong.streams}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TopSongs;
