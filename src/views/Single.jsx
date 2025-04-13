import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return <p>Item not found. <button onClick={() => navigate(-1)}>Go back</button></p>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <p>{item.description}</p>
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Size: {item.filesize}</p>
      <p>Type: {item.media_type}</p>
      <p>Owner: {item.username}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;