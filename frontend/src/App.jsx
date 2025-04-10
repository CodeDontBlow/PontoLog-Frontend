
import './App.css'
import BarChart from "./components/Charts/BarChart"
import LineChart from "./components/Charts/LineChart"
import DoubleLineChart from './components/Charts/DoubleLineChart'

function App() {
    let cores = ["#D92B66" , "#028391"]
    return (
      <div className='divParent'>
          <div className='divContainer'>
              <BarChart items={["Rodoviária" , "Aquífera" , "Aérea"]} values={[412,213,123]} chartTitle="Principais Vias" colorPalette={cores}/>
          </div>
          <div className="divContainer">
              <LineChart values={[20,10,20,10,-10]} period={[2014,2015,2016,2017,2018]} dataName={"Valor Agregado"} chartTitle="Valor Agregado" colorPalette={cores}/>
          </div>
          <div className="divContainer">
              <DoubleLineChart values={[[10,-10,10,-10,-50] , [-10,10,-10,10,50]]} period={[2014,2015,2016,2017,2018]} dataName={["Brasil" , "SP"]} chartTitle="Comparação Valor Agregado" colorPalette={cores}/>
          </div>

      </div>
    )
}

export default App
