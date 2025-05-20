import styles from "./ColorCard.module.css"

const ColorCard = ({title , color , region , content}) => {
    return(
        <div className={styles.card} style={{color: color}}>
            <div className={styles.colorArea}>

            </div>
            <div className={styles.contentArea}>
                <h4 className={styles.title}>
                    {title}
                </h4>

                {(region) &&
                    <p className={styles.text}>
                        {"Dados de "}
                        <span style={{color: color}} className={styles.highlightText}>{region}</span> 
                        {" serão exibidos por essa cor"}.
                    </p>
                }
                {(content) &&
                    <p className={styles.text}>
                        {content}
                    </p>
                }

            </div>
        </div>
    )
}

export default ColorCard