import { useEffect, useState } from "react"
import Link from "next/link";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./NGWCard.module.css"

function NGWCard(props) {
  const [filteredData] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <div>
      <div className={styles.card}>
        {filteredData !== []
          ? <Link href={`/warrior/${props?.data?.attributes[0].value}`}>
            <div className={styles.cardImg}>
              <img src={props?.data?.image} alt="nftImg" />
            </div>
            <div className={styles.cardStats}>
              <h1>Warrior #{props?.data?.attributes[0].value}</h1>
              {props?.data?.attributes?.slice(1,5)?.map((attributes, idx) => (
                <ProgressBar trait_type={attributes?.trait_type} value={attributes?.value} key={idx}/>
              ))}
            </div>
          </Link>
          : "Loading"}
      </div>
      <div className={styles.buttonContainer}>
        {/* <Button text="Purchase" theme="light" width="small"/> */}
        <a href={`https://testnets.opensea.io/assets/goerli/0x2A3a7B9bE3f27Aa0889FB213E680546031170537/${props?.data?.attributes[0].value}`} target="_blank" rel="noreferrer">
          <Button text="View on OpenSea" theme="light" width="large"/>
        </a>
      </div>
    </div>
  )
}

export default NGWCard