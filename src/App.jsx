import { useEffect, useState } from 'react';
import './App.css'
import { Dropdown } from './components/Dropdown/Dropdown';

import RoutesApp from './routes'

function App() {

  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (selectedOption) {
      console.log('Opção selecionada:', selectedOption);
    }
  }
    , [selectedOption])


  const options = [
    // Grupo 1: Frutas
    'Maçã',
    'Maçã Verde',
    'Maçã Vermelha',
    'Maçã Gala',
    'Maçã Fuji',
    'Maçã Orgânica',

    // Grupo 2: Cidades
    'São Paulo',
    'São Paulo Centro',
    'São Paulo Norte',
    'São Paulo Sul',
    'São Paulo Leste',
    'São Paulo Oeste',

    // Grupo 3: Produtos
    'Notebook',
    'Notebook Gamer',
    'Notebook Ultrafino',
    'Notebook Dell',
    'Notebook Lenovo',
    'Notebook HP',

    // Grupo 4: Animais
    'Gato',
    'Gato Siamês',
    'Gato Persa',
    'Gato Preto',
    'Gato Branco',
    'Gato Rajado'
  ]


  return (
    <>
      <RoutesApp />

      <div className="teste">
        <Dropdown search={true} options={options} onSelect={(option) => setSelectedOption(option)} />
        <Dropdown search={false} options={options} onSelect={(option) => setSelectedOption(option)} />
      </div >
    </>
  )
}

export default App;
