import React from 'react'
import styles from "./Button.module.css"

type ButtonProps = {
    text: string;
    width: string;
    theme: string;
};

const Button = ({text, theme, width}: ButtonProps) => {

    return (
        <div className={[styles.btn, styles[`${width}`],styles[`${theme}`],].join(" ")}>
            {text}
        </div>
    )
}

export default Button