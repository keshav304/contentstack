import React from 'react';

export default function CategoryInfo({ props }) {
  return (
    <div className="category-info">
      <h3>{props.category_title}</h3>
      <p>
        {props.description}
      </p>
    </div>
  );
}
