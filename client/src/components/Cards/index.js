import { Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react'
import Swipes from '../Swipes'

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../../utils/queries';

//to submit reaction
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

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

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  const doSomething = () => {
    var something=thoughts.map(thought => {return {id:thought._id}});
    alert(something.id);
  }

  // submit form
  // onBlur={() => doSomething()}

  const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId }
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
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
      <h3 className='infoText'>Press play, volume up, swipe through the art, and comment on what you like!</h3>
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