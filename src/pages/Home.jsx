import React, { useState, useEffect } from "react";
import "./home.scss";
import DetailsPopup from "./DetailsPopup";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openDetailsPopup = (item) => {
    setSelectedItem(item);
  };

  const closeDetailsPopup = () => {
    setSelectedItem(null);
  };

  const renderIncludes = (includes) => {
    if (includes && includes.length > 0) {
      return (
        <ul>
          {includes.slice(0, 4).map((include, index) => (
            <li key={index}>{include}</li>
          ))}
          {includes.length > 4 && <li>And more...</li>}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="home">
      <div className="boxes">
        {data.map((item, index) => (
          <div className="box" key={index}>
            <h1>{item.service}</h1>
            {item.includes ? (
              renderIncludes(item.includes)
            ) : (
              <p>{truncateDescription(item.description)}</p>
            )}
            <button onClick={() => openDetailsPopup(item)}>Details</button>
          </div>
        ))}
      </div>
      {selectedItem && (
        <DetailsPopup item={selectedItem} onClose={closeDetailsPopup} />
      )}
    </div>
  );
};

const truncateDescription = (description) => {
  const words = description.split(" ");
  if (words.length > 10) {
    return words.slice(0, 50).join(" ") + "...";
  }
  return description;
};

export default Home;
