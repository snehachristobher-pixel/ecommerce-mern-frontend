import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = ({ prevPath, nextPath }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 20 }}>
      {prevPath && (
        <button onClick={() => navigate(prevPath)} style={{ marginRight: 10 }}>
          &larr; Back
        </button>
      )}
      {nextPath && (
        <button onClick={() => navigate(nextPath)}>
          Next &rarr;
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
