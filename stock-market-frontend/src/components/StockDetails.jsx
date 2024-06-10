import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8008/api/stocks/${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        setStock(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setLoading(false);
      });
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (!stock) return <div>Stock not found</div>;

  return (
    <div className="App">
      <h1>{stock.company}</h1>
      <p>{stock.description}</p>
      <ul>
        <li>Initial Price: ${stock.initial_price}</li>
        <li>Price in 2002: ${stock.price_2002}</li>
        <li>Price in 2007: ${stock.price_2007}</li>
      </ul>
    </div>
  );
};

export default StockDetails;
