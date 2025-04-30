import React from 'react'
import styles from './Input.module.css'

const Input = ({ placeholder, label, className, style, onChange }) => {
    return (
        <div className={`${styles['input-container']}`}>
            <div>{label ? label : placeholder}</div>
            <input placeholder={placeholder} className={`${className} ${styles['input']}`} style={{ ...style }} onChange={onChange} />
        </div>
    )
}

export default Input