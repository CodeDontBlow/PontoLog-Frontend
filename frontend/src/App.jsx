
import './App.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Button from './components/Buttons/Button'

function App() {

  return (
    <>
     <Button variant='Btn-lbl' label="icon" icon={faTrash} />
     <Button variant='Btn-icon' label="icon" icon={faTrash} />
     <Button variant='Btn-lbl-icon' label="icon" icon={faTrash} />
    </>
  )
}

export default App
