import { useState } from "react"
import Link from "next/link"
import Button from "../../components/Button/Button"
import styles from "./Mint.module.css"
import { ethers } from 'ethers'
import axios, { AxiosRequestConfig } from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDispatch } from 'react-redux'
import { setCurrentNGWSupply, setIsMintingTrue, setModalData } from "../../redux/mainSlice"
import { useAppSelector } from "../../utils/hooks"
import { contractABI } from "../../utils/contract"

const Mint = () => {
    const dispatch = useDispatch();
    const [pullData, setPullData] = useState(false);
    const { address } = useAccount()
    const state = useAppSelector((state) => state.mainSlice);

    //   CONTRACT WRITE CONFIGURATION
    const { config } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: [{
            "name": "mintNewWarrior",
            "type": "function",
            "stateMutability": "payable",
            "outputs": [],
            "inputs": []
        }] as const,
        functionName: 'mintNewWarrior',
        overrides: {
            value: ethers.utils.parseEther('0.001'),
        },
    })

    //   FUNCTION FOR CALLING THE WRITE FUNCTION
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            dispatch(setIsMintingTrue())
            dispatch(setModalData([data.hash, "Pending..."]))
        },
        onError(data) {
            dispatch(setIsMintingTrue())
            dispatch(setModalData([data.message, "Error"]))
        }
    })
    
    //    WAGMI HOOK FOR WATCHING TRANSACTION STATUS
    useWaitForTransaction({
        hash: state.txHash,
        onSuccess(txData) {
            dispatch(setIsMintingTrue())
            dispatch(setModalData(["", "Minted"]))
            sendMetadataToServer(state?.currentNGWSupply)
        }
    })

    const { data: warriorSupply } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: [{
            "inputs": [],
            "name": "getNumberOfWarriors",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }] as const,
        functionName: 'getNumberOfWarriors',
        onSuccess(data) {
            dispatch(setCurrentNGWSupply(Number(data.toString())))
        }
    })

    const {data: warriorStats, refetch: getWarriorStatsFromContract } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "warriorId",
                    "type": "uint256"
                }
            ],
            "name": "getWarriorStats",
            "outputs": [
                {
                    "internalType": "uint256[6]",
                    "name": "metadata",
                    "type": "uint256[6]"
                },
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }] as const,
        functionName: 'getWarriorStats',
        args: [ethers.BigNumber.from(state?.currentNGWSupply)],
        enabled: false,
        onSuccess(data) {
            console.log(Number(warriorSupply?.toString()))
        },
        onError(err) {
            console.log('Error: ', err.message)
        },
    })

    const sendMetadataToServer = async (supply:any) => {
        try {
            const newWarriorData = await getWarriorStatsFromContract()
            const arrayOfAttributes = newWarriorData?.data?.[0]
            var newMetadata = JSON.stringify({
                "description": "Fast collection of 256 Viking Warriors preparing for war!", 
                "external_url": `https://battle-for-icy-fjord.netlify.app/ngw/${supply.toString()}`, 
                "image": `https://gateway.pinata.cloud/ipfs/QmXvu7prPdubtzNLwNzBs8gURxh79GjeX9jQA8PmxjGZtm/${arrayOfAttributes?.[4].toString()}${arrayOfAttributes?.[5].toString()}.png`, 
                "name": `Warrior #${supply.toString()}`,    
                "attributes": [
                    {
                        "trait_type": "tokenId",
                        "value": supply
                    },
                    {
                    "trait_type": "Strength", 
                    "value": arrayOfAttributes?.[0].toString()
                    }, 
                    {
                    "trait_type": "Dexterity", 
                    "value": arrayOfAttributes?.[1].toString()
                    }, 
                    {
                    "trait_type": "Charisma", 
                    "value": arrayOfAttributes?.[2].toString()
                    }, 
                    {
                    "trait_type": "Wisdom", 
                    "value": arrayOfAttributes?.[3].toString()
                    }, 
                    {
                    "trait_type": "House", 
                    "value": arrayOfAttributes?.[4].toString()
                    }, 
                    {
                    "trait_type": "Rarity", 
                    "value": arrayOfAttributes?.[5].toString()
                    }
                ]
            })           
            console.log("posted metadata:", newMetadata)
            var config:AxiosRequestConfig = {
                method: 'post',
                url: `https://battle-for-icy-fjord-server.herokuapp.com/warriors/${supply}?strength=${arrayOfAttributes?.[0].toString()}&dexterity=${arrayOfAttributes?.[1].toString()}&charisma=${arrayOfAttributes?.[2].toString()}&wisdom=${arrayOfAttributes?.[3].toString()}&house=${arrayOfAttributes?.[4].toString()}&rarity=${arrayOfAttributes?.[5].toString()}`,
                data : newMetadata
            }

           await axios(config)
        }catch(e){
            console.log(e)
        }
    }
    
    // INTERNAL FUNCTION FOR MINTING THE NFT
    const mintNewWarrior = () => {
        dispatch(setIsMintingTrue())
        if(address === undefined){
            dispatch(setModalData(["User not signed in", "Error"]))
        } else{
            dispatch(setModalData(["", "Pending..."]))
            write?.()
        }
    }

    return (
        <div className={styles.mint}>
            <div className={styles.hero}>
                <div>
                    <h1>Welcome to Nolengrad!</h1>
                    <h3>War has been declared. Recruit warriors to protect your kingdom!</h3>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Number of Vikings Deployed: &nbsp;{state.currentNGWSupply === 0 ? <Skeleton width={20} height={20} /> : state.currentNGWSupply}/256</h3>
                </div>
                <h3>Nolengrad Warriors is an NFT project utilizing Chainlink VRF to produce
                    verifiably random NFT's. Test it out below!
                </h3>
                <div className={styles.buttonHero}>
                    <div className={styles.button} onClick={() => mintNewWarrior()}>
                        <Button text="Recruit Warrior" theme="light" width="medium" />
                    </div>
                    <Link href="/about" className={styles.button}>
                        <Button text="Learn More" theme="light" width="medium" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Mint