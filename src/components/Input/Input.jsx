import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

import styles from "./Input.module.css"

const Input = ({ label, className, showIcon = false, icon, placeholder, type, id, value, onChange, onFocus, focused, onClick }) => {
    return (
    <>
        <label className={styles.label} htmlFor={id} > {label} </label>

        <div className={`${styles.inputContainer} ${className} ${focused ? styles.focused : ""}`}>
            <input className={styles.input}  type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} />
            {showIcon && icon && (
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} onClick={onClick} />
            )}
        </div>
    </>
    )

}

export default Input