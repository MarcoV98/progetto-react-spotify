import React from "react";

const AlbumImage = ({ cover, title, artistName }) => (
  <div>
    <img src={cover} className="card-img img-fluid" alt="Album" />
    <div className="mt-4 text-center">
      <p className="album-title">{title}</p>
    </div>
    <div className="text-center">
      <p className="artist-name">{artistName}</p>
    </div>
    <div className="mt-4 text-center">
      <button id="btnPlay" className="btn btn-success" type="button">
        Play
      </button>
    </div>
  </div>
);

export default AlbumImage;
