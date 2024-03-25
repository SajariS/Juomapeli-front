import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Logo from './Logo';

const FrontPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [gamePin, setGamepin] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);

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

        navigate('/gamelobby', {
            state: {
                player:
                {
                    userName: username,
                    isHost: true,
                    code: pin
                }
            }
        });
    };

    const handleJoinGame = () => {
        if (username.trim() === '') {
            alert("Syötä käyttäjänimesi ennen peliin liittymistä!");
        } else {
            navigate('/joingame');
        }
    };

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    }

    const closeModal = () => {
        setShowInstructions(false);
    }

    return (
        <>
            <Navigation />
            <br />
            <Logo />
            <div className='body'>
                <h2>Syötä käyttäjänimesi</h2>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange} />
                <br />
                <h2>Haluatko luoda pelin vai liittyä peliin?</h2>
                <button onClick={handleStartGame}>Luo uusi peli</button>
                <button onClick={handleJoinGame}>Liity peliin</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <button className="manual" onClick={toggleInstructions}>?</button>
            </div>
            {showInstructions && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={toggleInstructions}>&times;</span>
                        <h2>Pelin kulku:</h2>
                        <p>1.Jokainen pelaaja kirjoittaa kolme hyvää ja kolme huonoa piirrettä fiktiivisestä treffikumppanistaan erillisille lapuille. <br />
                            2. Laput taitetaan ja laitetaan pipoon tai muuhun säilytysastiaan. <br />
                            3. Pelaajat istuvat ympyrässä. <br />
                            4. Peli alkaa siten, että ensimmäinen pelaaja nostaa yhden lapun piposta. <br />
                            5. KAIKKI pelaajat juovat "ensimmäisille treffeille" ennen kuin ensimmäinen pelaaja lukee ääneen, mitä lapussa lukee. Sen jälkeen pelaaja päättää, haluaako hän jatkaa fiktiivisen treffikumppaninsa kanssa vai erota. <br />
                            6. Jos pelaaja haluaa jatkaa treffikumppanin kanssa, on seuraavan pelaajan vuoro. Jos pelaaja haluaa erota, hän heittää lapun pois. Sen jälkeen kaikki pelaajat juovat ja on seuraavan pelaajan vuoro. <br />
                            7. Peli jatkuu samalla kaavalla, ja kaikki pelaajat juovat jokaisen kolmansille, viidensille ja kuudensille treffeille. <br />
                            8. Peli päättyy, kun kaikki pelaajat ovat käyneet kuusilla treffeillään.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default FrontPage;