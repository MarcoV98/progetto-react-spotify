import React, { useEffect, useState } from 'react';

const ArtistPage = () => {
  const [artist, setArtist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSongClick = (songInfo) => {
    setSelectedSong(songInfo);
  };

  const handleLikeClick = (songInfo) => {
    setArtist((prevArtist) => ({
      ...prevArtist,
      data: prevArtist.data.map((song) =>
        song.id === songInfo.id ? { ...song, liked: !song.liked } : song
      ),
    }));
  };

  const albumCard = (songInfo) => (
    <div className="col-sm-auto col-md-auto text-center mb-5" key={songInfo.id}>
      <a href={`/album_page.html?id=${songInfo.album.id}`}>
        <img className="img-fluid" src={songInfo.album.cover_medium} alt={songInfo.title} />
      </a>
      <p>
        <a href="#">
          Track: {songInfo.title.length < 16 ? `${songInfo.title}` : `${songInfo.title.substring(0, 16)}...`}
        </a><br />
        <a href={`/album_page.html?id=${songInfo.album.id}`}>
          Album: {songInfo.album.title.length < 16 ? `${songInfo.album.title}` : `${songInfo.album.title.substring(0, 16)}...`}
        </a>
      </p>
      <button
        className={`btn btn-outline-primary ${songInfo.liked ? 'liked' : ''}`}
        onClick={() => handleLikeClick(songInfo)}
      >
        Mi piace
      </button>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      let artistId = new URLSearchParams(document.location.search).get("id");

      let headers = new Headers({
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
      });

      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          let artistData = await response.json();
          setArtist(artistData);

          const tracksResponse = await fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistData.name}`,
            {
              method: "GET",
              headers,
            }
          );

          if (tracksResponse.ok) {
            let tracklist = await tracksResponse.json();
            setArtist((prevArtist) => ({ ...prevArtist, data: tracklist.data }));
          } else {
            console.error("Error fetching tracks:", await tracksResponse.text());
          }
        } else {
          console.error("Error fetching artist:", await response.text());
        }
      } catch (exception) {
        console.error("Exception:", exception);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      {artist && (
        <div className="row">
          <div className="row">
            {artist.data.map((songInfo) => albumCard(songInfo))}
          </div>

          <div className="container-fluid fixed-bottom bg-container pt-1">
            <div className="row">
              <div className="col-lg-10 offset-lg-2">
                <div className="row">
                </div>
                <div className="row justify-content-center playBar py-3">
                  <div className="col-8 col-md-6">
                    {selectedSong && (
                      <div>
                        <p>Selected Song: {selectedSong.title}</p>
                      </div>
                    )}
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
