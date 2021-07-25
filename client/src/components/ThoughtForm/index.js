import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] }
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
      });
    }
  });

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addThought({
        variables: { thoughtText }
      });

      // clear form value
      setText('');
      setCharacterCount(0);
      alert("hello");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-8 col-md-6'>
        <div className='cardwide'>
          <h4 className='card-header'>Contribute</h4>
          <div className='card-body'>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
              {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form onSubmit={handleFormSubmit}>
              <textarea
                placeholder="Enter the URL of your cover..."
                value={thoughtText}
                className="form-input"
                onChange={handleChange}
              ></textarea>
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="centered px-3">
        <br />
      Make sure that your link works and that you have permission to share the picture!
      </div>
    </main>
        );
};

export default ThoughtForm;
