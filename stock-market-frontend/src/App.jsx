import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Stocks from "./components/Stocks";
import Watchlist from "./components/Watchlist";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    fetch("http://localhost:8008/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setWatchlist([...watchlist, stock]);
      })
      .catch((error) => {
        console.log("Error adding to watchlist", error);
      });
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/stocks"
          element={<Stocks addToWatchlist={addToWatchlist} />}
        />
        <Route
          path="/watchlist"
          element={<Watchlist watchlist={watchlist} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
