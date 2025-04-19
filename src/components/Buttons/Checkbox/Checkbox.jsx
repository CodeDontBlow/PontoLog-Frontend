import styles from './Checkbox.module.css'

const Checkbox = ({ id, label = 'Default', value, checked, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input 
        id={id} 
        type="checkbox"  
        value={value}
        checked={checked} 
        onChange={onChange}
        />

      <label htmlFor={id} className={styles.label}> {label} </label>
    </div>
  )
}

export default Checkbox