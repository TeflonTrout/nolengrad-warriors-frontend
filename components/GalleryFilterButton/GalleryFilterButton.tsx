import React from 'react'
import styles from './GalleryFilterButton.module.css'
import Image from "next/image";

export interface FilterButtonProps {
    onClick: any,
    text: string,
    keyword: number,
    active: string,
}

const GalleryFilterButton = (props: FilterButtonProps) => {
  return (
    <div className={styles.filterButton} onClick={props.onClick}>
        <h1 unselectable="on">{props.text}</h1>
        <div>
            <p style={{color: 'white'}}>
                {props.active === `${props.text.toLowerCase()}-asc` 
                    ? <p style={{marginLeft: '10px', rotate: "180deg"}}>V</p>
                    : props.active === `${props.text.toLowerCase()}-desc` 
                    ? <p style={{marginLeft: '10px'}}>V</p> 
                    : null }</p>
        </div>
    </div>
  )
}

export default GalleryFilterButton