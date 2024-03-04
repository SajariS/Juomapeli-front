import Cards from './components/Cards';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GameLobby from './components/Gamelobby';
import Joingame from './components/Joingame';
import FrontPage from './components/Frontpage';

function App() {

  return (
    <>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/gamelobby" element={<GameLobby />} />
            <Route path="/joingame" element={<Joingame />} />
            <Route path="/cards" element={<Cards />} />
          </Routes>
        </Container>
      </Router>     
    </>
  )
}

export default App
