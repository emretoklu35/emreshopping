import React from "react";
import Header from "./components/layout/Header/Header";
import Navbar from "./components/layout/Navbar/Navbar";
import HomePage from "./pages/HomePage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <main className="main-content">
        <HomePage />
      </main>
    </div>
  );
}

export default App;