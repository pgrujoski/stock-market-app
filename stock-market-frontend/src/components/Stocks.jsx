import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Stocks = ({ addToWatchlist }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8008/api/stocks")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  const getRandomColor = () => {
    const colors = ["#FF0000", "#00FF00"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <h1>Stock Market MERN app</h1>
      <h2>Stocks</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {stocks.map((stock) => (
            <li key={stock.symbol}>
              <Link to={`/stocks/${stock.symbol}`}>
                {stock.company} ({stock.symbol})
              </Link>{" "}
              -
              <span style={{ color: getRandomColor() }}>
                ${stock.initial_price}
              </span>
              <button onClick={() => addToWatchlist(stock)}>
                Add to my Watchlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stocks;
