import React from 'react'
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.hero}>
        <div>
          <h1>The whole purpose of the project is to display my expertise with Fullstack Web3 Engineering!</h1>
          <h2>I have written everything from the frontend you see now to the backend server and the Solidity contract!</h2>
          <p>The Frontend code can be viewed here: <a href="https://github.com/TeflonTrout/nolengrad-warriors-frontend" target="_blank" rel="noreferrer">Frontend Code</a></p>
          <p>The Backend server code can be viewed here: <a href="https://github.com/TeflonTrout/nolengrad-warriors-server" target="_blank" rel="noreferrer">Backend Code</a></p>
          <p>The Smart Contract can be viewed here: <a href="/" target="_blank" rel="noreferrer">Solidity Code</a></p>
        </div>
        <span></span>
        <div className={styles.container}>
          <h1>Here is the tech stack I used to create NGW!</h1>
          <div className={styles.stackContainer}>
            <div className={styles.stackList}>
              <h1>Frontend</h1>
              <ul>
                <li>Next.js</li>
                <li>Typescript</li>
                <li>Redux</li>
                <li>CSS</li>
              </ul>
            </div>
            <div className={styles.stackList}>
              <h1>Backend</h1>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>Solidity</li>
              </ul>
            </div>
            <div className={styles.stackList}>
              <h1>Other</h1>
              <ul>
                <li>Pinata Cloud</li>
                <li>Vercel</li>
                <li>Heroku</li>
                <li>Stable Diffusion (AI Art)</li>
              </ul>
            </div>
          </div>
        </div>
        <span></span>
        <div>
          <h2>Nolengrad Warriors (NGW) is an NFT project designed to utilize Chainlink's VRF Coordinator!</h2>
          <p>What is Chainlink's VRF you ask? Check it out <a href="https://docs.chain.link/docs/vrf/v2/introduction" target="_blank" rel="noreferrer">here!</a></p>
          <p>At it's core the VRF is an oracle that can be utilized by Smart Contracts for verified randomness.</p>
          <p>This allows users to create elements of randomness within NFT projects like NGW!</p>
          <p>Each warrior token is given a random hash and from that hash they acquire the given attributes:</p>
          <ul className={styles.attributeList}>
            <li className={styles.listItem}>Strength</li>
            <li className={styles.listItem}>Dexterity</li>
            <li className={styles.listItem}>Charisma</li>
            <li className={styles.listItem}>Wisdom</li>
            <li className={styles.listItem}>House</li>
            <li className={styles.listItem}>Rarity</li>
          </ul>
          <p>The "House" and "Rarity" traits are used to evaluate which image the warrior will have. Also note, all the art is AI generated!!</p>
        </div>
        <span></span>
        <div className={styles.bottomContainer}>
          <h1>The cool part you ask, all attributes are given ON MINT! What this means is there is no way to snipe a warrior with specific attributes.</h1>
          <h1>There is a private server that takes the values and stores the metadata in MongoDB.</h1>
        </div>
      </div>
    </div>
  )
}

export default About