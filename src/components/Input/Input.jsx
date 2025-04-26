import styles from "./Input.module.css"

const Input = ({label , placeholder , type , id}) => {
    return(
        <label className={styles.label} htmlFor={id}>
            <p className={styles.labelTxt}>{label}</p>
            <input className={styles.input} type={type} id={id} placeholder={placeholder}/>
        </label>
    )

}

export default Input