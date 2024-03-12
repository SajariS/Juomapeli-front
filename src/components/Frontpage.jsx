import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const FrontPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [gamePin, setGamepin] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    function generateRandomPin() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };


    const handleStartGame = () => {
        if (username.trim() === '') {
            alert("Syötä käyttäjänimesi ennen pelin aloittamista!");
            return;
        } 
            const pin = generateRandomPin();
            setGamepin(pin);

            navigate('/gamelobby',{state: {player:
                {userName: username, 
                    isHost: true, 
                    code: pin}}
                });
    };

    const handleJoinGame = () => {
        if (username.trim() === '') {
            alert("Syötä käyttäjänimesi ennen peliin liittymistä!");
        } else {
            navigate('/joingame');
        }
    };

    return (
        <div>
            <Navigation />
            <br />

            <h1>Tervetuloa!</h1>
            <input
                type="text"
                placeholder="Syötä käyttäjänimesi"
                value={username}
                onChange={handleUsernameChange}
            />
            <br />
            <h2>Haluatko luoda pelin vai liittyä peliin?</h2>
            <button onClick={handleStartGame}>Luo uusi peli</button>
            <button onClick={handleJoinGame}>Liity peliin</button>
        </div>
    );
};

export default FrontPage;