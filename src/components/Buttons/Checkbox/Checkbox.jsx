import styles from './Checkbox.module.css'

const Checkbox = ({ id, label = 'Default', value, checked, onChange }) => {
  return (
      <label htmlFor={id} className={`${styles.label} ${styles.checkboxContainer}`} >         
        <input 
          id={id} 
          type="checkbox"  
          value={value}
          checked={checked} 
          onChange={onChange}
        />
        {label} 

      </label>
  )
}

export default Checkbox