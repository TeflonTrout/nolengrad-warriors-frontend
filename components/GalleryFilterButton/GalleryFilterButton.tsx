import React from 'react'
import styles from './GalleryFilterButton.module.css'

export interface FilterButtonProps {
    onClick: any,
    text: string,
    keyword: number,
    isInverted: boolean
}

const GalleryFilterButton = (props: FilterButtonProps) => {
  return (
    <div className={styles.filterButton} onClick={props.onClick}>
        <h1>{props.text}</h1>
        <div>
            <p style={{color: 'white'}}>{props.isInverted ? "^" : "V" }</p>
        </div>
    </div>
  )
}

export default GalleryFilterButton