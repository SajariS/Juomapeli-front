import React, { useState } from 'react';

const EnterUsername = ({ setUsername }) => {
    const [usernameInput, setUsernameInput] = useState('');

    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
        setUsername(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Käyttäjänimi"
                value={usernameInput}
                onChange={handleUsernameChange}
            />
        </div>
    );
};

export default EnterUsername;