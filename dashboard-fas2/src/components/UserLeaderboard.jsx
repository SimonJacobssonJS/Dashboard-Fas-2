import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserLeaderboard = ({ usersData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersData && usersData.users && Array.isArray(usersData.users)) {
      const sortedUsers = usersData.users
        .map((user) => {
          const totalStreams = user.monthlyStreams.reduce(
            (sum, { streams }) => sum + streams,
            0
          );
          return { ...user, totalStreams };
        })
        .sort((a, b) => b.totalStreams - a.totalStreams);

      setUsers(sortedUsers);
    }
  }, [usersData]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>
        User Streams Leaderboard
      </h1>
      {users.length === 0 ? (
        <p className='text-gray-500'>
          No users to display. Check the console for errors.
        </p>
      ) : (
        <ul className='space-y-4'>
          {users.slice(0, 10).map((user, index) => (
            <li key={user.id} className='border-b border-gray-200'>
              <Link
                to={`/profiles/${user.id}`}
                className='flex items-center p-4 bg-white hover:bg-gray-50 transition rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                tabIndex='0'
                aria-label={`Go to ${user.name}'s profile`}>
                <span className='text-lg font-semibold text-gray-600 w-8'>
                  {index + 1}.
                </span>
                <img
                  src={user.profilePicture}
                  alt={`${user.name}'s profile`}
                  className='w-10 h-10 rounded-full mr-4'
                />
                <div className='flex-grow'>
                  <p className='text-lg font-medium text-gray-900'>
                    {user.name}{' '}
                    <span className='text-gray-500'>({user.location})</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    Total Streams: {user.totalStreams}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserLeaderboard;
