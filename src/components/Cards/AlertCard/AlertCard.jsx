import styles from "./AlertCard.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AlertCard = ({variant = "text" , icon , text , product , region , period}) => {
    return(
        <div className={styles.card}>
            {/* Se o ícone for definido, exibe ele */}
            {icon && <FontAwesomeIcon icon={icon} className={styles.icon}/>}

            {/* Variante 'text' (texto livre) */}
            {(variant == "text") && <p className={styles.text}> {text} </p>}

            {/* Variante 'allInfo' (Informações de exibição) */}
            {(variant == "allInfo") &&
                <p className={styles.text}>

                {/* Produtos */}
                Exibindo dados de <span className={styles.dataDisplay}>{product}</span>

                {/* Região (se for definida)*/}
                {region && 
                    <>
                        {" em"} <span className={styles.dataDisplay}>{region}</span>
                    </>
                }

                {/* Período de Tempo (se for definido)*/}
                {period &&
                    <>
                    {", pelo período de "}
                    {/* Verifica se há dois anos na array de período de tempo */}
                    {period.length === 2 ?
                        // Se sim, exibe ambos os períodos
                        <>
                            <span className={styles.dataDisplay}>{period[0]}</span>
                            {" até "}
                            <span className={styles.dataDisplay}>{period[1]}</span>
                        </>
                        
                        // Se não, exibe apenas o primeiro ano da array de período
                        : <>
                            <span className={styles.dataDisplay}>{period[0]}</span>
                        </>
                    }
                    </>
                }
                </p>
            }
            
            {/* Variante 'comparisonInfo' (Informações de regiões sendo comparadas) */}
            {(variant == "comparisonInfo" && region.length > 1) &&
                <p className={styles.text}>
                    {"Comparando "}
                    <span className={styles.dataDisplay}>{region[0]}</span>
                    {" com "} 
                    <span className={styles.dataDisplay}>{region[1]}</span>
                </p>
            }

        </div>
    )
}

export default AlertCard