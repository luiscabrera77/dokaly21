import { Link } from 'react-router-dom';
import React from 'react';


const ThoughtList = ({ thoughts }) => {
  if (!thoughts.length) {
    return <h3>No Covers Yet</h3>;
  }

  return (
    <div id='cardDivs' className="px-3">
      <div className='cardContainerhorizontal'>
        {thoughts &&
          thoughts.map(thought => (
            <div key={thought._id}>
              <Link to={`/thought/${thought._id}`}>
              <div style={{ backgroundImage: 'url(' + thought.thoughtText + ')' }} className='cardhorizontal'>
              <h3>{thought.reactionCount} comments</h3>
              </div>
              </Link>  
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThoughtList;