import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = props => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (
    Auth.loggedIn() &&
    Auth.getProfile().data.username === userParam
  ) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="profilepage" className="text-center">
      <div>
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Become a Fan of {user.username}
          </button>
        )}
      </div>
      <br />
      <div>
        <div>
          <ThoughtList thoughts={user.thoughts} />
        </div>
        <div>
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
