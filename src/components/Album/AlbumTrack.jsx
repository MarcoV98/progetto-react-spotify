import React from "react";

const AlbumTrack = ({ title, duration }) => (
  <div className="py-3 trackHover">
    <a href="#" className="card-title trackHover px-3" style={{ color: "white" }}>
      {title}
    </a>
    <small className="duration" style={{ color: "white" }}>
      {Math.floor(parseInt(duration) / 60)}:
      {parseInt(duration) % 60 < 10
        ? "0" + (parseInt(duration) % 60)
        : parseInt(duration) % 60}
    </small>
  </div>
);

export default AlbumTrack;
