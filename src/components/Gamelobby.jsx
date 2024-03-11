/* eslint-disable react/prop-types */
//Stomp tai SockJS vaatii globalin, vite ei sitä määritä
//Jokaisella WS/STOMP komponentilla pakko importoida ensimmäisenä init.js
import "./init";
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from './Navigation';


//Saadaan player olio mikä sisältää ,isHost, code yms
const GameLobby = () => {

  const navigate = useNavigate();
  const {state} = useLocation();
  
  const [pin, setPin] = useState('');
  const [host, setHost] = useState(false);
  const [connected, setConnected] = useState(false);

  const [player, setPlayer] = useState(null);

  // Osallistujien listan tila
  const [playerList, setPlayerList] = useState([]);

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
    setConnected(true);
    client.subscribe('/lobby/' + state.player.code, (courier) => {
      const recievedList = JSON.parse(courier.body)
      //Lista pakko käsitellä, koska map ei syystä tai toisesta hyväksy key arvoksi id:tä suoraan
      setPlayerList(recievedList.map((item, _) => {
        return {
        ...item,
        key: item.id
        }
      }))
    });
    client.publish({destination: '/app/join/' + state.player.code, body: JSON.stringify(state.player)})
  }

  //Lähettää lähtökohtaisesti beforeUnload eventin yhteydessä pyynnön palvelimelle
  //Palvelin poistaa pelaajan ja lähettää socketin kautta "viestin", joka päivttää pelaajien listat
  client.onDisconnect = () => {
    fetch('http://localhost:8080/wsapi/lobby/' + state.player.id, { method: 'DELETE'})
    .catch(error => {
      console.error(error);
    })
  }

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    client.unsubscribe();
    client.deactivate();
    setConnected(false);
  }

  const handleRejoin = () => {
    //Voi jatkokehittää jos riittää aika, vaatii aika paljon, koska pelaaja poistetaan kannasta asti, eli ID vaihtuu
    // useState pelaajalla, tuo reactin batchien kanssa aika paljon sekoilua WS:än yhteydessä varsinkin
    navigate('/joingame');
  }

  useEffect(() => {
    // TODO: Toteuta WS-integraatio, 

    //Tarkastetaan onko state tyhjä ja käsitellään dataa tai siirretään takaisin etusivulle
    if(!state) {
      navigate('/');
    }
    else {
      console.log(state.player);
      setPin(state.player.code);
      setHost(state.player.isHost);
      client.activate();
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  return (
      <div>
          <Navigation />
        <br />
        {connected ? 
        <>
          <h1>Treffipeli</h1> 
          <h1>Lobby</h1>
          <p>Game pin: {pin}</p>
          <ul>
            {playerList.map((player) => (
              <li key={player.key}>{player.userName}</li>
            ))}
          </ul>
          {host && <button>Start game</button>}
        </> :
        <>
          <button onClick={() => handleRejoin()}>Rejoin</button>
        </>}
      </div>
  );
};

export default GameLobby;
