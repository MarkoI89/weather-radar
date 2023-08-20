import './App.css';
import BasicWeather from './components/BasicWeather/BasicWeather';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<BasicWeather />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
