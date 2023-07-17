import { useEffect } from 'react';
import '../styles/App.css';
import Navbar from './Navbar';
import Header from './Header';
import WhyUs from './WhyUs';
import Footer from './Footer';

import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <div className="App">
        <Navbar/>
        <Header/>
        {/* <WhyUs/> */}
        {/* <Footer/> */}
    </div>
  );
}

export default App;
