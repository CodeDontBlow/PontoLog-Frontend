import { useEffect, useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import ScrollTop from './components/ScrollTop/ScrollTop';

import RoutesApp from './routes'

function App() {
  return (
    
    <section id='pageGridLayout'>
      <Sidebar />
      <section id="contentSection">
      <ScrollTop />
      <RoutesApp />
      </section >
      <Footer />
    </section>
  )
}

export default App;