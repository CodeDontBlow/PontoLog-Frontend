import styles from "./Loading.module.css"

const Loading = () => {
    return (
        <div>
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}

export default Loading

