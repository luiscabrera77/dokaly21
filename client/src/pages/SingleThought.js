import { useParams } from 'react-router-dom';
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';


const SingleThought = props => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });
  
  const thought = data?.thought || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
  <div>
    <div className="cardContainer px-3">
      <div style={{ backgroundImage: 'url(' + thought.thoughtText + ')' }} className="card">
        <Link to={`/profile/${thought.username}`}>
          <br />
          <h3>by {thought.username}</h3>
        </Link>
      </div>
    </div>
    {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    <h4>{thought.reactionCount} comments</h4>
    {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
  </div>
   
  );
};

export default SingleThought;
