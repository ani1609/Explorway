import { useEffect } from 'react';
import '../styles/App.css';
import Header from './Header';
import Navbar from './Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <div className="App">
        
        <Navbar/>
        <Header/>
    </div>
  );
}

export default App;
