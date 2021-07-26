import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  return (

    <div>
        <div className="cardcomments">
        <br />
        {reactions &&
          reactions.map(reaction => (
            <p key={reaction._id}>
              <Link to={`/profile/${reaction.username}`} className="buttons" style={{ fontWeight: 700 }}>
                <button>{reaction.username}:</button>
              </Link>
              {reaction.reactionBody} {' '}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;