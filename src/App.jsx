import Cards from './components/Cards';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Cards />} />
          </Routes>
        </Container>
      </Router>     
    </>
  )
}

export default App
