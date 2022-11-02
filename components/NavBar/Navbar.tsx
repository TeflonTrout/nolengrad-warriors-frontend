import React, { FC } from 'react'
import Link from 'next/link';
import styles from "./Navbar.module.css"
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar: FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Nolengrad Warriors</h1>
      </div>
      <div className={styles.links}>
        <h2><Link href="/">Home</Link></h2>
        <h2><Link href="/about">About</Link></h2>
        <h2><Link href="/gallery">Gallery</Link></h2>
        <h2><Link href="/mint">Mint</Link></h2>
        <div className={styles.connectBtn}>
          <ConnectButton showBalance={true} accountStatus="avatar"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar;