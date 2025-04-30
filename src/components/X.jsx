import React from 'react'
import styles from './XO.module.css'

const X = ({ isVisible }) => {
    return (
        <div className={`${styles["visible"]} ${styles["X"]}`}>
            <div className={styles["dia1"]} />
            <div className={styles["dia2"]} />
        </div >
    )
}

export default X