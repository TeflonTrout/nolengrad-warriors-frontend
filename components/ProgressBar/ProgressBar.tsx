import React from 'react'
import styles from "./ProgressBar.module.css"

type ProgressProps = {
    trait_type: string,
    value: number
}

function ProgressBar(props:ProgressProps) {

    return (
        <div className={styles.progressBar}>
            <h3>{props?.trait_type}:</h3> 
            <div className={styles.valueBar}>
                <div className={styles.fillerBar} style={{width: `${props?.value *  10}%`}}>
                    <p>{props?.value}</p>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar