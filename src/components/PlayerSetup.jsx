import { useState, useEffect } from "react";
export default function PlayerSetup({ playerNumber }) {
  const [image, setImage] = useState(null);

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!image) {
      setImageURL(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setImageURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);
  return (
    <>
      <p>Player {playerNumber}</p>

      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        accept="image/*"
      />

      {imageURL && (
        <img src={imageURL} alt={`Player ${playerNumber}`} width="150" />
      )}
    </>
  );
}
