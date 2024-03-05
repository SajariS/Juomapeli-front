import React, { useState } from 'react';
import Navigation from './Navigation';

function Cards() {
  const [goodCards, setGoodCards] = useState([{ id: 'good1', content: '' }]);
  const [badCards, setBadCards] = useState([{ id: 'bad1' , content: '' }]);

  const addGoodCard = () => {
    if (goodCards.length < 3) {
      const newId = `good${goodCards.length + 1}`;
      setGoodCards([...goodCards, { id: newId, content: '' }]);
    }
  }; 
//TESTI EI TARVII VALITTAAA TEKSTISTA
  const addBadCard = () => {
    if (badCards.length < 3) {
        const newId = `bad${badCards.length + 1}`;
        setBadCards([...badCards, { id: newId, content: ''}]);
    }
  };

  const handleGoodContentChange = (id, content) => {
    const updatedCards = goodCards.map(card =>
      card.id === id ? { ...card, content: content } : card
    );
    setGoodCards(updatedCards);
  };

  const handleBadContentChange = (id, content) => {
    const updatedCards = badCards.map(card =>
      card.id === id ? { ...card, content: content } : card
    );
    setBadCards(updatedCards);
  }

  return (
    <div className="container">
    <Navigation />
      <br />
      <h1>Treffipeli</h1>
      <p>Kirjoita kolme hyvää piirrettä fiktiivisestä treffikumppanistasi:</p>
      <div className="cards">
        {goodCards.map(card => (
          <div key={card.id} className="card">
            <textarea
              rows="3"
              placeholder="Kirjoita hyvä piirre tähän"
              value={card.content}
              onChange={e => handleGoodContentChange(card.id, e.target.value)}
            ></textarea>
          </div>
        ))}
      </div>
      {goodCards.length < 3 && (
      <button className="add-card-btn" onClick={addGoodCard}>Lisää hyvä piirre</button>
      )}

      <p>Kirjoita kolme huonoa piirrettä fiktiivisestä treffikumppanistasi:</p>
      <div className="cards">
        {badCards.map(card => (
          <div key={card.id} className="card">
            <textarea
              rows="3"
              placeholder="Kirjoita huono piirre tähän"
              value={card.content}
              onChange={e => handleBadContentChange(card.id, e.target.value)}
            ></textarea>
          </div>
        ))}
      </div>
      {badCards.length < 3 && <button className="add-card-btn" onClick={addBadCard}>Lisää huono piirre</button>}
    </div>
  );
}

export default Cards;
