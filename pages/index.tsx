import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import NGWCard from '../components/NGWCard/NGWCard'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
    const [dataArray, setDataArray] = useState<any[]>([]);

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
              return setDataArray(prevState => [...prevState, nft])
            })
          })
        } catch(e) {
          console.error(e)
        }
      }
      getData();
    }, [])

  return (
    <div className={styles.home}>
      <h1 className={styles.header}>Recently Minted</h1>
      <div className={styles.cardGallery}>
        { dataArray?.length > 0 
          ? dataArray?.map((item:any, idx:number) => (
              <NGWCard data={item} key={idx}/>
            ))
            : <div className={styles.cardGallery}>
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
              <Skeleton width={262} height={430} borderRadius={20} style={{margin: "0px", alignSelf: "center", display: 'flex', justifyContent: 'center', alignContent: 'center'}} />
            </div>
        }
      </div>
    </div>
  )
}
