import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { faMap } from "@fortawesome/free-solid-svg-icons"
import styles from './IconTitle.module.css'

const IconTitle = ({icon , title , variant , size = "large"}) => {
    return(
        <div className={`${styles.container} ${size}`}>
            {variant === "lineChart" && <FontAwesomeIcon icon={faChartLine} className={`${styles.icon}`}/>}
            {variant === "barChart" && <FontAwesomeIcon icon={faChartBar} className={`${styles.icon}`}/>}
            {variant === "map" && <FontAwesomeIcon icon={faMap} className={`${styles.icon}`}/>}
            {icon && <FontAwesomeIcon icon={icon} className={`${styles.icon}`}/>}

            <h2 className={styles.title}>
                {title}
            </h2>
        </div>
    )
}

export default IconTitle