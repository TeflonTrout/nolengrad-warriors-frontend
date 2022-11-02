import React from 'react'
import { useDispatch } from 'react-redux'
import { setIsMintingFalse } from '../../redux/mainSlice';
import styles from "./MintingModal.module.css"
import { useAppSelector } from '../../utils/hooks';

const MintingModal = () => {
    const dispatch = useDispatch();
    const state = useAppSelector((state:any) => state.mainSlice);

    function closeModal() {
        dispatch(setIsMintingFalse())
    }

    function errorMsgSwitch(errorMsg:string) {
        if(errorMsg.includes("user rejected")){
            return "Changed your mind?"
        } else if(errorMsg.includes("not signed in")) {
            return "Looks like you haven't connected your wallet!"
        } else {
            return "Oops, Not sure what happened there :/"
        }
    }

    function modalSwitch() {
        switch(state.txStatus) {
            case "Error":
                return (
                    <>
                        <h1>Oops, Something Went Wrong</h1>
                        <h3>
                            {state.txStatus}: {errorMsgSwitch(state.txHash)}
                        </h3>
                    </>
                )
            case "Pending...":
                return (
                    <>
                        <h1>Your Warrior is on the way!</h1>
                        {state.txHash === "" 
                            ? null
                            :<h3>View your transaction here: &nbsp;
                                <a href={`https://goerli.etherscan.io/tx/${state.txHash}`} target="_blank" rel="noopener noreferrer">
                                    {state.txHash.slice(0,5)}...{state.txHash.slice(37,42)}
                                </a>
                            </h3>}
                        <h3>Current Status: {state.txStatus}</h3>
                    </>
                )
            case "Minted":
                return (
                    <>
                        <h1>Your Warrior has arrived!</h1>
                        {/* Maybe display image of NGW Card */}
                    </>
                )   
            default:
                return (
                    <>
                        ...
                    </>
                )
        }
    }

    return (
        <div className={state.isMinting ? styles.modal : styles.closed}>
            <div className={styles.closeBtn} onClick={() => closeModal()}>
                X
            </div>
            <div className={styles.container}>
                {modalSwitch()}
            </div>
        </div>
    )
}

export default MintingModal