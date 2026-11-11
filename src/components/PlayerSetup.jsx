
import { useState, useEffect } from "react";

export default function PlayerSetup({
  playerNumber,
  playerName,
  setPlayerName,
  image,
  setImage,
}) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!image) {
      setImageURL(null);
      return;
    }

    if (typeof image === "string") {
      setImageURL(image);
      return;
    }

    const url = URL.createObjectURL(image);
    setImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const inputId = `player-image-${playerNumber}`;

  return (
    <div className="player-setup">
      <div className="setup-player-label">
        PLAYER 0{playerNumber}
      </div>

      <div className="setup-avatar-container">
        {imageURL ? (
          <img
            src={imageURL}
            alt={`${playerName}'s avatar`}
            className="setup-avatar"
          />
        ) : (
          <div className="avatar-placeholder">?</div>
        )}
      </div>

      <label className="setup-input-label">
        CHARACTER NAME
      </label>

      <input
        className="setup-name-input"
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        maxLength={18}
      />

      <input
        id={inputId}
        className="hidden-file-input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
      />

      <label htmlFor={inputId} className="upload-button">
        <span>+</span> CHANGE AVATAR
      </label>
    </div>
  );
}
