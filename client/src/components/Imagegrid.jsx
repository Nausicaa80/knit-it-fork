import React from 'react';
 
function ImageGrid({ tutorials, onTutorialSelect }) {
  return (
    <div className='image-grid'>
      {tutorials.map((tutorial) => (
        <div key={tutorial.id} className='image-item'>
          <img
            src={tutorial.img}
            alt={tutorial.url}
            onClick={() => onTutorialSelect(tutorial)}
          />
          <button onClick={() => onTutorialSelect(tutorial)}>Select</button>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;