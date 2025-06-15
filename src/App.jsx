import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import ScrollTop from './components/ScrollTop/ScrollTop';
import RoutesApp from './routes'

import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (

    <section id='pageGridLayout'>
      <Sidebar theme={theme} setTheme={setTheme} />
      <section id="contentSection">
        <ScrollTop />
        <RoutesApp />
      </section >
      <Footer />
    </section>
  )
}

export default App;