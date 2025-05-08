import styles from "./ColorCard.module.css"

const ColorCard = ({title , color , content}) => {
    return(
        <div className={styles.card} style={{color: color}}>
            <div className={styles.colorArea}>

            </div>
            <div className={styles.contentArea}>
                <h4 className={styles.title}>
                    {title}
                </h4>

                <p className={styles.text}>
                    {content}
                </p>
            </div>
        </div>
    )
}

export default ColorCard