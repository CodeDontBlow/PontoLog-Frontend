import About from '../pages/about/About'
import Comparison from '../pages/comparison/Comparison'
import Home from '../pages/home/Home'
import Statistics from '../pages/statistics/Statistics'

const Routes = [
    {path:'/', name:'Home' ,element: <Home />},
    {path:'/', name:'Comparison' ,element: <Comparison />},
    {path:'/', name:'About' ,element: <About />},
    {path:'/', name:'Statistics' ,element: <Statistics />},
]

export default Routes