import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom"

const MainPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [rockSection, setRockSection] = useState([]);
  const [popSection, setPopSection] = useState([]);
  const [hipHopSection, setHipHopSection] = useState([]);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length > 2) {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`
        );

        if (response.ok) {
          const result = await response.json();
          const songs = result.data;

          setSearchResults(songs);
        } else {
          console.log("Error fetching search results");
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleArtist = async (artistName, setSection) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
      );

      if (response.ok) {
        const result = await response.json();
        const songInfo = result.data[0];

        setSection((prevSection) => [...prevSection, albumCard(songInfo)]);
      } else {
        console.log(`Error fetching ${artistName} section`);
      }
    } catch (error) {
      console.error(`Error during handling ${artistName}:`, error);
    }
  };

  const albumCard = (songInfo) => {
    return (
      <div key={songInfo.id} className="col text-center">
        <Link to={`/album/${songInfo.album.id}`}>
          <img
            className="img-fluid"
            src={songInfo.album.cover_medium}
            alt="Album cover"
          />
        </Link>
        <p>
          <Link to={`/album/${songInfo.album.id}`}>
            Album:{" "}
            {songInfo.album.title.length < 16
              ? `${songInfo.album.title}`
              : `${songInfo.album.title.substring(0, 16)}...`}
          </Link>
          <br />
          <Link to={`/artist/${songInfo.artist.id}`}>
            Artist: {songInfo.artist.name}
          </Link>
        </p>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      document.querySelector("#searchField").value = "";

      const rockRandomArtists = [];
      const popRandomArtists = [];
      const hipHopRandomArtists = [];

      while (rockRandomArtists.length < 4) {
        const artist = rockArtists[Math.floor(Math.random() * rockArtists.length)];
        if (!rockRandomArtists.includes(artist)) {
          rockRandomArtists.push(artist);
        }
      }

      while (popRandomArtists.length < 4) {
        const artist = popArtists[Math.floor(Math.random() * popArtists.length)];
        if (!popRandomArtists.includes(artist)) {
          popRandomArtists.push(artist);
        }
      }

      while (hipHopRandomArtists.length < 4) {
        const artist = hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];
        if (!hipHopRandomArtists.includes(artist)) {
          hipHopRandomArtists.push(artist);
        }
      }

      for (let j = 0; j < rockRandomArtists.length; j++) {
        await handleArtist(rockRandomArtists[j], setRockSection);
      }

      for (let k = 0; k < popRandomArtists.length; k++) {
        await handleArtist(popRandomArtists[k], setPopSection);
      }

      for (let l = 0; l < hipHopRandomArtists.length; l++) {
        await handleArtist(hipHopRandomArtists[l], setHipHopSection);
      }
    };

    fetchData();
  }, []);

  const rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
  ];
  const popArtists = [
    "maroon5",
    "coldplay",
    "onerepublic",
    "jamesblunt",
    "katyperry",
    "arianagrande",
  ];
  const hipHopArtists = [
    "eminem",
    "snoopdogg",
    "lilwayne",
    "drake",
    "kanyewest",
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar onSearch={handleSearch} />
        </div>

        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-10">
              <div
                id="searchResults"
                style={{ display: searchResults.length > 0 ? "block" : "none" }}
              >
                <h2>Search Results</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {searchResults.map((songInfo) => albumCard(songInfo))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="rock">
                <h2>Rock Classics</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {rockSection}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="pop">
                <h2>Pop Culture</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {popSection}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div id="hiphop">
                <h2>#HipHop</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {hipHopSection}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
