import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink to="/" end>
                        Etusivu
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/joingame">
                        Peliin liittyminen
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/gamelobby">
                        Gamelobby
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cards">
                        Kortit
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
