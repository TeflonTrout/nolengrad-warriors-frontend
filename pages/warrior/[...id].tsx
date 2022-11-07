import {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import styles from "./IndividualWarrior.module.css"
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../../components/Button/Button';

type URLParams = {
    id: string
}

const IndividualWarrior = () => {
    const router = useRouter();

    const [isError, setIsError] = useState<boolean>(false);
    const [warriorData, setWarriorData] = useState<any>([]);

  useEffect(() => {
    const getWarriorData = async () => {
      if(router?.query?.id !== undefined){
        try {
          var config:AxiosRequestConfig = {
            method: 'get',
            url: `https://battle-for-icy-fjord-server.herokuapp.com/warriors/${router?.query?.id}`,
            headers: { 
              "Access-Control-Allow-Origin": "*"
            }
          };
          axios(config)
          .then((res:AxiosResponse) => {
            if(res?.data?.message === null) {
              setIsError(true);
            }
            setWarriorData(res?.data?.message)
            console.log(res?.data?.message)
          })
        } catch(e) {
          console.log(e)
        }
      }
    }

    getWarriorData()
  }, [router])

  const renameWarrior = async () => {
    try {
      console.log('yes')
    } catch(e){
      console.error(e)
    }
  }

  return (
    <div className={styles.warriorPage}>
        <div className={styles.imgContainer}>
          {isError ? "This Warrior does not exist." : null}
          <img 
            src={warriorData?.image} 
            alt="warrior"
            style={warriorData?.attributes?.[6]?.value === 1 
              ? {border: "20px solid black"} 
              : warriorData?.attributes?.[6]?.value === 2 
                ? {border: "20px solid grey"} 
                : warriorData?.attributes?.[6]?.value === 3 
              ? {border: "20px solid gold"} 
              : {}} />
        </div>
        <div className={styles.container}>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: 'center', width: '75%', marginBottom: '20px'}}>
            <h1 className={styles.header}>{warriorData?.name}</h1>
            <Button text="Edit Name" theme="light" width='large'/>
          </div>
          {warriorData?.attributes?.slice(1,5)?.map((attribute:any) => (
            <div className={styles.statBox}>
              <h1>{attribute?.trait_type}</h1>
              <div className={styles.circle}>
                <CircularProgressbar 
                  value={attribute?.value} 
                  minValue={0}
                  maxValue={10}
                  background={true} 
                  strokeWidth={15}
                  styles={buildStyles({
                    pathColor: "#1366FF",
                    textColor: "white",
                    trailColor: "darkgrey",
                    backgroundColor: "#181818",
                    strokeLinecap: "butt",
                    textSize: "36px"
                  })}
                  text={`${attribute?.value}`}/>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default IndividualWarrior