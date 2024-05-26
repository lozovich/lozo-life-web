import React from 'react';
import { useHistory } from 'react-router-dom';

const InvalidSignUp = () => {
  const history = useHistory();

  const handleBack = () => history.replace('/signup');

  return (
    <div>
      <h2 className='text-center'>Invalid Url!!</h2>
      <p className='text-center'>Please try again</p>
      <div className='d-flex justify-content-center'>
        <button type='button' onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default InvalidSignUp;
