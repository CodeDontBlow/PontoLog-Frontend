import { useEffect, useState } from 'react';
import './App.css'
import { Dropdown } from './components/Dropdown/Dropdown';
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'

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
    
    <section id='pageGridLayout'>
      <Sidebar />
      <section id="contentSection">
        <Dropdown search={true} options={options} onSelect={(option) => setSelectedOption(option)} />
        <Dropdown search={false} options={options} onSelect={(option) => setSelectedOption(option)} />
      <RoutesApp />
      </section >
      <Footer />
    </section>
  )
}

export default App;