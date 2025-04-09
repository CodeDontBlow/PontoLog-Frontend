import styles from './Radiobutton.module.css';

const Radiobutton = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className={styles.radioButton}>
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Radiobutton  