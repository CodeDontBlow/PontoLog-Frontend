
import './App.css'
import BarChart from "./components/Charts/BarChart"
import LineChart from "./components/Charts/LineChart"

function App() {
  let cores = ["#D92B66" , "#028391"]
  return (
    <>
      <div>
        <BarChart items={["Rodoviária" , "Aquífera" , "Aérea"]} values={[412,213,123]} chartTitle="Principais Vias" colorPalette={cores}/>
        <LineChart values={[[-323,323,-231,234,-123] , [342,232,232,2342,234]]} period={[2014,2015,2016,2017,2018,2019]} dataName={["Brasil" , "SP"]} chartTitle="Valor Agregado" colorPalette={cores}/>
      </div>
    </>
  )
}

export default App
