import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import MainPage from "./components/Home/MainPage";
import AlbumPage from "./components/Album/AlbumPage";
import ArtistPage from "./components/Artist/ArtistPage";

const App = () => {
  return (
    <Router>
      <div>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>
        <Player />
      </div>
    </Router>
  );
};

export default App;


