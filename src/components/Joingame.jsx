import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { Input } from '@mui/material';

const JoinGame = () => {
  const [gamePin, setGamePin] = useState('');
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

  const handleJoinGame = () => {
    fetch(apiUrl + '/api/players', {
      method: 'POST',
      headers: { 'Content-type':'application/json'},
      body: JSON.stringify({
        userName: playerName,
        code: gamePin,
        isHost: false
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error when joining: " + response.statusText);
      }
      else {
        return response.json();
      }
    })
    //Data korvattu player, vaikuttaa GameLobbyn hallintaan
    .then(player => {
      navigate('/gamelobby', { state: { player }});
    })
    .catch(err => console.error(err))
  }


  return (
    <div>
      <Navigation />
      <br />
      <h1>Liity peliin</h1>
      <p>Anna pelin PIN-koodi:</p>
      <Input
        type="text"
        value={gamePin}
        onChange={(e) => setGamePin(e.target.value)}
        placeholder='Koodi'
      />
      <Input
        type='text'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder='Nimi'
      />
      <button onClick={handleJoinGame}>Liity peliin</button>
    </div>
  );
};

export default JoinGame;