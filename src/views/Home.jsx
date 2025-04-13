import React, { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const mediaWithUser = await Promise.all(mediaData.map(async (item) => {
        try {
          const userData = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
          return { ...item, username: userData.username };
        } catch (userError) {
          console.error('Failed to fetch user data for item:', item.media_id, userError);
          return { ...item, username: 'Unknown' };
        }
      }));

      setMediaArray(mediaWithUser);
    } catch (error) {
      console.error('getMedia failed:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2>Media Files</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;