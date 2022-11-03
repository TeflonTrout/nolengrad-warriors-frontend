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
  const [keyword, setKeyword] = useState<number>(1);
  const [isInverted, setIsInverted] = useState<boolean>(false);

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

  useEffect(() => {
    const sortByKeyword = (type:number) => {
      if(isInverted){
        const newArr = [...dataArray].sort((a:Warrior, b:Warrior) => a.attributes[type].value > b.attributes[type].value ? -1 : 1)
        setDataArray(newArr);
      } else {
        const newArr = [...dataArray].sort((a:Warrior, b:Warrior) => a.attributes[type].value > b.attributes[type].value ? 1 : -1)
        setDataArray(newArr)
      }
    }
    sortByKeyword(keyword)
  }, [keyword, isInverted])
  
  const updateKeyword = (newFilter:number) => {
    setKeyword(newFilter);
  }

  return (
    <div className={styles.galleryPage}>
      <div className={styles.filterButtonContainer}>
        <div className={keyword === 1 ? styles.filterButtonActive : styles.filterButton}>
          <GalleryFilterButton onClick={() => updateKeyword(1)} keyword={keyword} text="Strength" isInverted={isInverted} />
        </div>
        <div className={keyword === 1 ? styles.filterButtonActive : styles.filterButton}>
          <h1 onClick={() => updateKeyword(1)}>Strength</h1>
        </div>
        <div className={keyword === 2 ? styles.filterButtonActive : styles.filterButton}>
          <h1 onClick={() => updateKeyword(2)}>Dexterity</h1>
        </div>
        <div className={keyword === 3 ? styles.filterButtonActive : styles.filterButton}>
          <h1 onClick={() => updateKeyword(3)}>Charisma</h1>
        </div>
        <div className={keyword === 4 ? styles.filterButtonActive : styles.filterButton}>
          <h1 onClick={() => updateKeyword(4)}>Wisdom</h1>
        </div>
        <div className={keyword === 5 ? styles.filterButtonActive : styles.filterButton}>
          <h1 onClick={() => updateKeyword(5)}>Rarity</h1>
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