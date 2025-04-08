
import './App.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Button from './components/Buttons/Button/Button'
import Checkbox from './components/Buttons/Checkbox/Checkbox'
import Radio from './components/Buttons/Radiobutton/Radiobutton'

function App() {

  return (
    <div>
      <div className="botoes">
        <Button variant='Btn-lbl' label="icon" icon={faTrash} />
        <Button variant='Btn-icon' label="icon" icon={faTrash} />
        <Button variant='Btn-lbl-icon' label="icon" icon={faTrash} />
      </div>
      <div className="botoes">
        <Checkbox></Checkbox>
      </div>
      <div className="botoes">

      </div>
    </div>
  )
}

export default App
