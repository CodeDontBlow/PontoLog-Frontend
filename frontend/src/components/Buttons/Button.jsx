import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Button.module.css';

const Button = ({ variant = "Btn-lbl", label, icon, onClick, disabled = false }) => {
    return (
        <button className={style[variant]} onClick={onClick} disabled={disabled}>
            {variant === "Btn-lbl" && <span className={style.label}>{label}</span>}

            {variant === "Btn-icon" && <FontAwesomeIcon icon={icon} className={style.icon} />}

            {variant === "Btn-lbl-icon" && (
                <>
                    <span className={style.label}>{label}</span>
                    <FontAwesomeIcon icon={icon} className={style.icon} />
                </>
            )}
        </button>
    );
};

export default Button;