import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import styles from "./Gallery.module.css"
import { Warrior } from '../../types/types'

import NGWCard from '../../components/NGWCard/NGWCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import GalleryFilterButton from '../../components/GalleryFilterButton/GalleryFilterButton'

const Gallery = () => {
  const [dataArray, setDataArray] = useState<any>([]);
  const [active, setActive] = useState<string>("");
  const [keyword, setKeyword] = useState<number>(0);

  // FETCH DATA FROM API
  useEffect(() => {
    const getData = async () => {
      try {
        var config:AxiosRequestConfig = {
          method: 'get',
          url: "https://battle-for-icy-fjord-server.herokuapp.com/getAll",
          headers: { 
            "Access-Control-Allow-Origin": "*"
          }
        };
        axios(config)
        .then((res:AxiosResponse) => {
          res?.data?.message?.map((nft:any) => {
            return setDataArray((prevState:any) => [...prevState, nft])
          })
          console.log(dataArray)
        })
      } catch(e) {
        console.error(e)
      }
    }
    getData();
  }, [])

  // FUNCTION TO SORT ARRAY BY ATTRIBUTE
  const sortArray = (type:string) => {
      const types:Object = {
        strength: 1,
        dexterity: 2,
        charisma: 3,
        wisdom: 4,
        rarity: 5
      }
      const filterProperty = Number(types[type as keyof Object]);
      setKeyword(filterProperty);
      if(active !== `${type}-asc`){
        setActive(`${type}-asc`)
        const newArr = [...dataArray].sort((a:Warrior, b:Warrior) => {
          return a.attributes[filterProperty].value > b.attributes[filterProperty].value ? -1 : 1
        })
        setDataArray(newArr);
      } else if (active === `${type}-asc`) {
        setActive(`${type}-desc`)
        const newArr = [...dataArray].sort((a:Warrior, b:Warrior) => {
          return a.attributes[filterProperty].value < b.attributes[filterProperty].value ? -1 : 1
        })
        setDataArray(newArr)
      }
  }

  return (
    <div className={styles.galleryPage}>
      <div className={styles.filterButtonContainer}>
        <div className={keyword === 1 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => sortArray("strength")} active={active} keyword={keyword} text="Strength" />
        </div>
        <div className={keyword === 2 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => sortArray("dexterity")} active={active} keyword={keyword} text="Dexterity" />
        </div>
        <div className={keyword === 3 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => sortArray("charisma")} active={active} keyword={keyword} text="Charisma" />
        </div>
        <div className={keyword === 4 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => sortArray("wisdom")} active={active} keyword={keyword} text="Wisdom" />
        </div>
        <div className={keyword === 5 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => sortArray("rarity")} active={active} keyword={keyword} text="Rarity" />
        </div>
      </div>
      <div className={styles.cardGrid}>
        { dataArray.length > 0 
          ?dataArray?.map((item:any, idx:number) => (
            <div className={styles.card} key={idx}>
              <NGWCard data={item}/>
            </div>
            ))
            : <div className={styles.cardGallery}>
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "20px", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
            </div>
        }
      </div>
    </div>
  )
}

export default Gallery