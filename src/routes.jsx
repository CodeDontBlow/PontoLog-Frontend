import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importando as páginas
import About from './pages/about/About'
import ComparisonStats from './pages/comparisonStats/ComparisonStats'
import Home from './pages/home/Home'
import Statistics from './pages/statistics/Statistics'

const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/comparison/statistics' element={<ComparisonStats/>}/>
        </Routes>
    )
}

export default RoutesApp