import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationButtons.css';

const NavigationButtons = ({ prevPath, nextPath }) => {
  const navigate = useNavigate();

  return (
    <div className="nav-btn-group">
      {prevPath && (
        <button onClick={() => navigate(prevPath)} className="nav-btn">
          &larr; Back
        </button>
      )}
      {nextPath && (
        <button onClick={() => navigate(nextPath)} className="nav-btn">
          Next &rarr;
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
