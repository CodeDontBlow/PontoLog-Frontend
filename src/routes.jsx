import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importando as páginas
import About from './pages/about/About'
import Comparison from './pages/comparison/Comparison'
import Home from './pages/home/Home'
import Statistics from './pages/statistics/Statistics'

const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/comparison' element={<Comparison />} />
            <Route path='/statistics' element={<Statistics />} />
        </Routes>
    )
}

export default RoutesApp