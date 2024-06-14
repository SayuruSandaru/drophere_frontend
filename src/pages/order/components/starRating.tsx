import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, reviews }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faStar} style={{ color: 'gold', marginRight: '8px' }} />
      <span>{rating}</span>
      <span style={{ marginLeft: '8px', color: 'gray' }}>({reviews} reviews)</span>
    </div>
  );
};

export default StarRating;