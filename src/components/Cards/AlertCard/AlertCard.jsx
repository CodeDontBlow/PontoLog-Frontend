import styles from "./AlertCard.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AlertCard = ({icon , text , product , region , period}) => {
    return(
        <div className={styles.card}>
            <FontAwesomeIcon icon={icon} className={styles.icon}/>

            {text && <p> {text} </p>}
            
            {(product && region && period) &&
                <p className={styles.text}>
                    Exibindo dados de 
                        <span className={styles.dataDisplay}>{product}</span>, em 
                        <span className={styles.dataDisplay}>{region}</span>, pelo período de 
                        {period.length === 2 ?
                        <>
                            <span className={styles.dataDisplay}>{period[0]}</span> até
                            <span className={styles.dataDisplay}>{period[1]}</span>
                        </> :
                        <>
                            <span className={styles.dataDisplay}>{period[0]}</span>
                        </>

                        }
                </p>
            }

        </div>
    )
}

export default AlertCard