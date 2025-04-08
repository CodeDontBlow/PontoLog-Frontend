import styles from './Checkbox.module.css'

const Checkbox = ({ id, label = 'Default', value, checked, onClick, onChange }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input 
        id={id} 
        type="checkbox"  
        value={value}
        checked={checked} 
        onClick={onClick} 
        onChange={onChange}
        />

      <label htmlFor="checkbox" className={styles.label}> {label} </label>
    </div>
  )
}

export default Checkbox