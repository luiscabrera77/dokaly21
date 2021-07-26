import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <h5>{username} doesn't follow anyone yet!</h5>;
  }

  return (
    <div>
      <div className="centered px-3">
        <h6>{username} follows</h6>
      </div>
      <div className="buttons">
      {friends.map(friend => (
        <button className='button' key={friend._id}>
          <Link to={`/profile/${friend.username}`} key={friend._id}>{friend.username}</Link>
        </button>
      ))}
      </div>
    </div>
  );
};

export default FriendList;
//{friendCount}