import React from 'react'
import Link from 'next/link'
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.logoContainer}>
          <h2><Link href="/">Nolengrad Warriors</Link></h2>
        </div>
        <div className={styles.container}>
          <Link href='/'><p>Home</p></Link>
          <Link href='/about'><p>About</p></Link>
          <Link href='/mint'><p>Mint</p></Link>
        </div>
        <div className={styles.container}>
          <a href="https://github.com/TeflonTrout/nolengrad-warriors-frontend" target="_blank" rel='noreferrer'><p>GitHub</p></a>
          <Link href="https://goerli.etherscan.io/address/0x5f78e249f0eb5271567079c2d43abb87664a4510"><p>Contract</p></Link>
          <a href="https://testnets.opensea.io/" target="_blank" rel='noreferrer'><p>OpenSea</p></a>
        </div>
    </div>
  )
}

export default Footer