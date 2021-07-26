import { Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react'
import Swipes from '../Swipes'

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../../utils/queries';

function Cards () {

  const { data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  //console.log(thoughts);
  var db=thoughts.map(thought => {return {name:thought.username, url: thought.thoughtText, id:thought._id}});
  const alreadyRemoved = []

  let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.
  
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }



  return (
    <div id='cardDivs'>
      <div className='cardContainer'>
        {db.map((character, index) =>
          <Swipes ref={childRefs[index]} className='swipe' key={character.url} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
            <Link to={`profile/${character.name}`}>
              <h3>by {character.name}</h3>
            </Link>
            <Link to={`thought/${character.id}`}>
            <div className="buttons">
              <button className="button">Comment</button>
            </div>
            </Link>
            </div>
          </Swipes>
        )}
      </div>
      <br /><br />
      <div className="textcontainer centered px-3">
      <h3 className='infoText'>Press play, swipe through the art, comment on what you like, follow artists and submit your own art!</h3>
      </div>
      {/*<div className='buttons hidden'>
        <button onClick={() => swipe('left')}>No</button>
        <button onClick={() => swipe('right')}>Yes</button>
      </div>
      <br /><br />
      <div className="textcontainer centered px-3">
        {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h3 className='infoText'>Press play to start listening, and then swipe through the cards. Comment on the ones you feel that go well with the song!</h3>}
      </div>*/}

      {/* when lastDirection === "right", grab "thought.id" 
      and fill out and submit the Reaction form with "right"*/}

      {/* per card, declare a new constant "rightswipeTHOUGHTID" 
      and when lastDirection === "right", +1 */}

      {/* look for the H3 HTML tag with ID "characterID" and 
      extract the content to get the ID"*/}

    </div>
  )
}


export default Cards