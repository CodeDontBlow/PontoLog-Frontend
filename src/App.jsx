import { useState } from 'react';
import './App.css'
import { Dropdown } from './components/Dropdown/Dropdown';

import RoutesApp from './routes'

function App() {

  const [selectedOption, setSelectedOption] = useState(null)


  const options = ['opção1', 'opção2', 'opção3', 'alternativa', 'alternativa']

  return (
    <>
      <RoutesApp />
      <Dropdown search={true} options={options} onSelect={(option) => setSelectedOption(option)}/>
    </>
  )
}

export default App;
