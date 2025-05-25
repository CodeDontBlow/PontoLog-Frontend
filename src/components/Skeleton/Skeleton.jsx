import styles from "./Skeleton.module.css";

const Skeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
        </div>
    );
};

export default Skeleton;
