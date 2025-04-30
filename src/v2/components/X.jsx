import React from 'react'
import styles from './XO.module.css'

const X = ({ isVisible, isAnimated, direction }) => {
    return (
        <div className={`${isVisible && styles["visible"]} ${isAnimated && styles["animated"]} ${direction === "both" && styles["both"]} ${styles["X"]}`}>
            <div className={styles["dia1"]} />
            <div className={styles["dia2"]} />
        </div >
    )
}

export default X