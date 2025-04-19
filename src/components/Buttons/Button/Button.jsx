import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';

const Button = ({ variant = "Btn-lbl", label, icon, onClick, disabled = false }) => {
    return (
        <button className={`${styles.button} ${disabled ? styles.disabled : ''}`} onClick={onClick} disabled={disabled}>
            {variant === "Btn-lbl" && <span className={styles.label}>{label}</span>}

            {variant === "Btn-icon" && <FontAwesomeIcon icon={icon} className={styles.icon} />}

            {variant === "Btn-lbl-icon" && (
                <>
                    <span className={styles.label}>{label}</span>
                    <FontAwesomeIcon icon={icon} className={styles.icon} />
                </>
            )}
        </button>
    );
};

export default Button;