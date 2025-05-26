import React, { useEffect } from 'react';
import '../styles/LoadingAnimation.css';

const LoadingAnimation = ({ onFinished }) => {
  useEffect(() => {
    // Simuler un temps de chargement puis appeler onFinished
    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="food-loader">
          <div className="plate"></div>
          <div className="fork-knife">
            <div className="fork"></div>
            <div className="knife"></div>
          </div>
          <div className="food-items">
            <div className="food-item rice"></div>
            <div className="food-item fish"></div>
            <div className="food-item vegetables"></div>
            <div className="food-item sauce"></div>
          </div>
        </div>
        <h2 className="loading-text">Préparation de votre repas...</h2>
        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
