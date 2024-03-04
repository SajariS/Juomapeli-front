import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const FrontPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleStartGame = () => {
        if (username.trim() === '') {
            alert("Syötä käyttäjänimesi ennen pelin aloittamista!");
        } else {
            navigate('/gamelobby');
        }
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