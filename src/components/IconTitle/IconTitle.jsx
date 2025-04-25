import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { faMap } from "@fortawesome/free-regular-svg-icons"
import styles from './IconTitle.module.css'

// Ícones pre definidos
const presetIcons = {
    lineChart : faChartLine,
    barChart : faChartBar,
    map : faMap,
}

const IconTitle = ({icon , title , variant , size = "medium"}) => {
    // Define o ícone selecionado (um ícone específico ou uma das variantes) 
    const selectedIcon = icon || presetIcons[variant]

    return(
        <div className={`${styles.container} ${styles[size]}`}>
            {/* Aplica o ícone selecionado */}
            <FontAwesomeIcon icon={selectedIcon} className={`${styles.icon}`}/>

            <h2 className={styles.title}>
                {title}
            </h2>
        </div>
    )
}

export default IconTitle