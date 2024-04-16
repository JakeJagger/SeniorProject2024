// Keyboard.js

import React, { useState } from 'react';

function Keyboard({ value, setValue }) {
  const [capsLock, setCapsLock] = useState(false);

  const toggleCapsLock = () => {
    setCapsLock(!capsLock);
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case 'backspace':
        setValue(value.slice(0, -1));
        break;
      case 'enter':
        setValue(value + '\n');
        break;
      case 'space':
        setValue(value + ' ');
        break;
      case 'caps':
        toggleCapsLock();
        break;
      default:
        const newValue = capsLock ? key.toUpperCase() : key.toLowerCase();
        setValue(value + newValue);
    }
  };

  const keyLayout = [
  /*
    //row 1
    "1","2","3","4","5","6","7","8","9","0","backspace",
    //row 2
    "q","w","e","r","t","y","u","i","o","p",
    //row 3
    "caps","a","s","d","f","g","h","j","k","l","enter",
    //row 4
    "shift","z","x","c","v","b","n","m",",",".","?",
    //row 5
    "space",
  */
    //row 1
    "1","2","3","4","5","6","7","8","9","0","backspace",
    //row 2
    "q","w","e","r","t","y","u","i","o","p",
    //row 3
    "caps","א","s","d","f","g","h","j","k","l","enter",
    //row 4
    "shift","z","x","c","v","b","n","m",",",".","?",
    //row 5
    "space",
  ];

  return (
    <div className="keyboard">
      <div className="keyboard__keys">
        {keyLayout.map((key) => {
          return (
            <button 
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Keyboard;