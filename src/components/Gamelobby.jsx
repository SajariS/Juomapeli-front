import React, { useState, useEffect } from 'react';

const GameLobby = ({ players, code, isHost }) => {
  // Osallistujien listan tila
  const [playerList, setPlayerList] = useState([]);

  // Haetaan pelaajat WS:stä (TODO)
  useEffect(() => {
    // TODO: Toteuta WS-integraatio
    // Simuloidaan pelaajien hakeminen esimerkillä
    const simulatedPlayers = [
      { userName: 'Pelaaja 1' },
      { userName: 'Pelaaja 2' },
      { userName: 'Pelaaja 3' },
    ];
    setPlayerList(simulatedPlayers);
  }, []);

  return (
    <div>
       <h1>Treffipeli</h1> 
      <h1>Lobby</h1>
      <p>Game pin: {code}</p>
      <ul>
        {playerList.map((player) => (
          <li key={player.userName}>{player.userName}</li>
        ))}
      </ul>
      {isHost && <button>Start game</button>}
    </div>
  );
};

export default GameLobby;
