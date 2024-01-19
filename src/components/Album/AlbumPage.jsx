import React, { useEffect, useState } from "react";
import AlbumImage from "./AlbumImage";
import AlbumTrack from "./AlbumTrack";

const AlbumPage = () => {
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const albumId = new URLSearchParams(document.location.search).get("id");
      const headers = new Headers({
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
      });

      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          const albumData = await response.json();
          setAlbum(albumData);
        } else {
          setError(`An error occurred: ${await response.text()}`);
        }
      } catch (exception) {
        setError(`An error occurred: ${exception}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-12 col-md-9 offset-md-3 mainPage">
      <div className="col-md-3 pt-5 text-center" id="img-container">
        {album && <AlbumImage cover={album.cover} title={album.title} artistName={album.artist.name} />}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="col-md-8 p-5">
        <div className="row">
          <div className="col-md-10 mb-5" id="trackList">
            {album &&
              album.tracks.data.map((track) => (
                <AlbumTrack key={track.id} title={track.title} duration={track.duration} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
