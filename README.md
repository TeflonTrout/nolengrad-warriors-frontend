This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## The purpose of the project is to display my expertise with Fullstack Web3 Engineering!

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can attempt to mint one of the verifiably random NFTs by connecting your Web3 Wallet to the Goerli testnetwork and navigating to [http://localhost:3000/mint](http://localhost:3000/mint) and clicking on the "Recruit Button".

## Nolengrad Warriors (NGW) is an NFT project designed to utilize Chainlink's VRF Coordinator!

What is Chainlink's VRF you ask? Check it out [here](https://docs.chain.link/docs/vrf/v2/introduction/)!

At it's core the VRF is an oracle that can be utilized by Smart Contracts for verified randomness.

This allows users to create elements of randomness within NFT projects like NGW!

Each warrior token is given a random hash and from that hash they acquire the given attributes:

- Strength
- Dexterity
- Charisma
- Wisdom
- House
- Rarity

The "House" and "Rarity" traits are used to evaluate which image the warrior will have. Also note, all the art is AI generated!!

## Protected from NFT Sniping

The cool part you ask, all attributes are given ON MINT! What this means is there is no way to snipe a warrior with specific attributes.
There is a private server that takes the values and stores the metadata in MongoDB.
