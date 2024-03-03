/* eslint-disable react/prop-types */
//Stomp tai SockJS vaatii globalin, vite ei sitä määritä
//Jokaisella WS/STOMP komponentilla pakko importoida ensimmäisenä init.js
import "./init";
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLocation } from "react-router-dom";

//Saadaan player olio mikä sisältää ,isHost, code yms
const GameLobby = () => {

  const {state} = useLocation();
  /*//simuloitu player
  const player = {
    userName: 'TestiPelaaja',
    code: '123abc',
    isHost: true
  } */
  // Osallistujien listan tila
  const [playerList, setPlayerList] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(state.player);

  //Stomp client määritys, brokerURL = ws:<SockJS osoite>
  //Alempi SockJS "emuloi" WS yhteyttä, käytännössä kääntää http metodilla saadun osoitteen ws metodille
  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      //Headers, tulevaisuutta varten
    },
    debug: (str) => console.log(str)
  })

  //SockJS määritys
  client.webSocketFactory = () => {
    return new SockJS('http://localhost:8080/ws');
  }

  client.onConnect = () => {
    client.subscribe('/lobby/' + currentPlayer.code, (courier) => {
      const recievedList = JSON.parse(courier.body)
      //Lista pakko käsitellä, koska map ei syystä tai toisesta hyväksy key arvoksi id:tä suoraan
      setPlayerList(recievedList.map((item, _) => {
        return {
        ...item,
        key: item.id
        }
      }))
    });
    client.publish({destination: '/app/join/' + currentPlayer.code, body: JSON.stringify(currentPlayer)})
  }

  //Vaatii aijemman komponentin toimimaan, poisto perustuu palvelimen puolella id:seen, jota on vaikeampi simuloida 
  client.onDisconnect = () => {
    fetch('http://localhost:8080/wsapi/lobby', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentPlayer)
    })
    .catch(error => {
      console.error(error);
    })
  }

  const checkConnection = () => {
    return client.connected;
  }

  const handleReconnect = () => {
    client.activate();
  }

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    console.log('testi');
    //client.deactivate();
  }

  useEffect(() => {
    // TODO: Toteuta WS-integraatio
    console.log(location.state);
    client.activate();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  return (
      <div>
        {checkConnection ? 
        <>
          <h1>Treffipeli</h1> 
          <h1>Lobby</h1>
          <p>Game pin: {currentPlayer.code}</p>
          <ul>
            {playerList.map((player) => (
              <li key={player.key}>{player.userName}</li>
            ))}
          </ul>
          {currentPlayer.isHost && <button>Start game</button>}
          <button onClick={() => console.log(checkConnection())}>Testi status</button>
          <button onClick={() => client.deactivate({force: true})}>Testi disconnect</button>
        </> :
        <>
          <button onClick={() => handleReconnect()}>Rejoin</button>
        </>}
      </div>
  );
};

export default GameLobby;
