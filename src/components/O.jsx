import React from 'react'
import styles from './XO.module.css'

const O = ({ isVisible }) => {
    return (
        <div className={`${styles["visible"]} ${styles["O"]}`} />
    )
}

export default O