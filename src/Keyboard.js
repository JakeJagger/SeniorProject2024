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
      case '1':
        setValue(value + '1');
        break;
      case '2':
        setValue(value + '2');
        break;
      case '3':
        setValue(value + '3');
        break;
      case '4':
        setValue(value + '4');
        break;
      case '5':
        setValue(value + '5');
        break;
      case '6':
        setValue(value + '6');
        break;
      case '7':
        setValue(value + '7');
        break;
      case '8':
        setValue(value + '8');
        break;
      case '9':
        setValue(value + '9');
        break;
      case '0':
        setValue(value + '0');
        break;
      case 'ש (q)':
        setValue(value + 'ש');
        break;
      case 'ק (w)':
        setValue(value + 'ק');
        break;
      case 'ר (e)':
        setValue(value + 'ר');
        break;
      case 'א (r)':
        setValue(value + 'א');
        break;
      case 'ט (t)':
        setValue(value + 'ט');
        break;
      case 'ו (y)':
        setValue(value + 'ו');
        break;
      case 'ן (u)':
        setValue(value + 'ן');
        break;
      case 'ם (i)':
        setValue(value + 'ם');
        break;
      case 'פ (o)':
        setValue(value + 'פ');
        break;
      case 'ף (p)':
        setValue(value + 'ף');
        break;
      case 'ז (a)':
        setValue(value + 'ז');
        break;
      case 'ס (s)':
        setValue(value + 'ס');
        break;
      case 'ד (d)':
        setValue(value + 'ד');
        break;
      case 'ג (f)':
        setValue(value + 'ג');
        break;
      case 'כ (g)':
        setValue(value + 'כ');
        break;
      case 'ע (h)':
        setValue(value + 'ע');
        break;
      case 'י (j)':
        setValue(value + 'י');
        break;
      case 'ח (k)':
        setValue(value + 'ח');
        break;
      case 'ל (l)':
        setValue(value + 'ל');
        break;
      case 'צ (z)':
        setValue(value + 'צ');
        break;
      case 'ץ (x)':
        setValue(value + 'ץ');
        break;
      case 'ת (c)':
        setValue(value + 'ת');
        break;
      case 'ך (v)':
        setValue(value + 'ך');
        break;
      case 'ב (b)':
        setValue(value + 'ב');
        break;
      case 'נ (n)':
        setValue(value + 'נ');
        break;
      case 'מ (m)':
        setValue(value + 'מ');
        break;
      case ',':
        setValue(value + ',');
        break;
      case '.':
        setValue(value + '.');
        break;
      case '?':
        setValue(value + '?');
        break;
      default:
        const newValue = capsLock ? key.toUpperCase() : key.toLowerCase();
        setValue(value + newValue);
    }
  };

  const keyLayout = [

    // Row 1
    "ש (q)", "ק (w)", "ר (e)", "א (r)", "ט (t)", "ו (y)", "ן (u)", "ם (i)", "פ (o)", "ף (p)", "backspace",
    // Row 2
    "caps", "ז (a)", "ס (s)", "ד (d)", "ג (f)", "כ (g)", "ע (h)", "י (j)", "ח (k)", "ל (l)", "enter",
    // Row 3
    "צ (z)", "ץ (x)", "ת (c)", "ך (v)", "ב (b)", "נ (n)", "מ (m)", ",", ".", "?",
    // Row 4
    "space",
  ];

  return (
    <div className="keyboard">
      <div className="keyboard__keys">
        {keyLayout.map((key) => (
          <button
            key={key}
            className="keyboard__key"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;