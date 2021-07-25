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
              <div style={{ backgroundImage: 'url(' + thought.thoughtText + ')' }} className='cardhorizontal'></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThoughtList;