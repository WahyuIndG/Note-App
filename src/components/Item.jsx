import React from 'react';
import { showFormattedDate } from '../utils/index';
import { getLetter, getRandomColor } from '../utils/local-data';
import PropTypes from 'prop-types';

export default function Item({ title, body, createdAt }) {
  const color = getRandomColor();
  const letter = getLetter(title);

  return (
    <div className="item">
      <div className="item__img">
        <div className="default" style={{ backgroundColor: color }}>
          <span style={{ color }} className="mini-box">
            {letter}
          </span>
        </div>
      </div>
      <div className="item__text">
        <h3>{title}</h3>
        <span>{showFormattedDate(createdAt)}</span>
        <p>{body}</p>
      </div>
    </div>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
