import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const [gamePin, setGamePin] = useState('');
  const navigate = useNavigate();

  const handleJoinGame = () => {
    // Kutsu rajapintaa käyttäjän luontiin
    // Käytä proppina käyttäjän nimen ja aseta host-tila falseksi
    // ...

    // Siirry gamelobby-sivulle
    navigate('/gamelobby');
  };

  return (
    <div>
      <h1>Liity peliin</h1>
      <p>Anna pelin PIN-koodi:</p>
      <input
        type="text"
        value={gamePin}
        onChange={(e) => setGamePin(e.target.value)}
      />
      <button onClick={handleJoinGame}>Liity peliin</button>
    </div>
  );
};

export default JoinGame;
