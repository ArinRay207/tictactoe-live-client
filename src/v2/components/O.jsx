import React from 'react'
import styles from './XO.module.css'

const O = ({ isVisible, isAnimated, direction }) => {
    return (
        <div className={`${isVisible && styles["visible"]} ${isAnimated && styles["animated"]} ${direction && direction === "both" && styles["both"]} ${styles["O"]}`} />
    )
}

export default O