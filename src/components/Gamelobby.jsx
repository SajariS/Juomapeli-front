/* eslint-disable react/prop-types */
//Stomp tai SockJS vaatii globalin, vite ei sitä määritä
//Jokaisella WS/STOMP komponentilla pakko importoida ensimmäisenä init.js
import "./init";
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

//Saadaan player olio mikä sisältää ,isHost, code yms
const GameLobby = ({ player_ }) => {

  //simuloitu player
  const player = {
    userName: 'TestiPelaaja',
    code: '123abc',
    isHost: true
  }
  // Osallistujien listan tila
  const [playerList, setPlayerList] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(player);

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

  client.onDisconnect = () => {
    // TODO: Disconnect event käsittely
  }

  useEffect(() => {
    // TODO: Toteuta WS-integraatio
    client.activate();

  }, []);

  return (
    <div>
       <h1>Treffipeli</h1> 
      <h1>Lobby</h1>
      <p>Game pin: {currentPlayer.code}</p>
      <ul>
        {playerList.map((player) => (
          <li key={player.key}>{player.userName}</li>
        ))}
      </ul>
      {currentPlayer.isHost && <button>Start game</button>}
      <button onClick={() => client.activate()}>Testi join</button>
      <button onClick={() => console.log(playerList)}>Testi tulosta lista</button>
    </div>
  );
};

export default GameLobby;
