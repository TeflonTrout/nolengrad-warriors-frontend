import Link from "next/link"
import Button from "../../components/Button/Button"
import styles from "./Mint.module.css"
import { ethers } from 'ethers'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDispatch } from 'react-redux'
import { setCurrentNGWSupply, setIsMintingTrue, setModalData } from "../../redux/mainSlice"
import { useAppSelector } from "../../utils/hooks"

const Mint = () => {
    const dispatch = useDispatch();
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

    //   CONTRACT MINT ARMY CONFIGURATION
    const { config: configArmy } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: [{
            "name": "mintArmy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "inputs": []
        }] as const,
        functionName: 'mintArmy',
        overrides: {
            value: ethers.utils.parseEther('0.004'),
        },
    })

    //   FUNCTION FOR CALLING THE CONTRACT MINT FUNCTION
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

    //   FUNCTION FOR CALLING THE CONTRACT MINT ARMY FUNCTION
    const { write: writeArmy } = useContractWrite({
        ...configArmy,
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
    
    // CONTRACT FUNCTION FOR MINTING THE NFT
    const mintNewWarrior = () => {
        dispatch(setIsMintingTrue())
        if(address === undefined){
            dispatch(setModalData(["User not signed in", "Error"]))
        } else{
            dispatch(setModalData(["", "Pending..."]))
            write?.()
        }
    }

    // CONTRACT FUNCTION FOR MINTING THE NFT
    const mintArmy = () => {
        dispatch(setIsMintingTrue())
        if(address === undefined){
            dispatch(setModalData(["User not signed in", "Error"]))
        } else{
            dispatch(setModalData(["", "Pending..."]))
            writeArmy?.()
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
                    <div onClick={() => mintNewWarrior()}>
                        <Button text="Recruit - 0.001ETH" theme="light" width="md-lg" />
                    </div>
                    <div onClick={() => mintArmy()}>
                        <Button text="Recruit Army - 0.004ETH" theme="light" width="md-lg" />
                    </div>
                    <Link href="/about">
                        <Button text="Learn More" theme="light" width="md-lg" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Mint