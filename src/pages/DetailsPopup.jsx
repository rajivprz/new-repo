import React from "react";

const DetailsPopup = ({ item, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h1>{item.service}</h1>
        <p>{item.description}</p>
        {item.includes && item.includes.length > 0 && (
          <div>
            <h2>Includes:</h2>
            <ul>
              {item.includes.map((include, index) => (
                <li key={index}>{include}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailsPopup;
