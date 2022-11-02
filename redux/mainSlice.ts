import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Address } from 'wagmi';
import { RootState } from '../utils/store';

export interface MainReducerState {
    log: string;
    isMinting: boolean;
    txHash: Address;
    txStatus: string;
    currentNGWSupply: number;
}

const initialMainState: MainReducerState = {
    log: "test",
    isMinting: false,
    txHash: "0x",
    txStatus: "",
    currentNGWSupply: 0
};

export interface apiReducerState {
    test: boolean
}

const initialAPIState: apiReducerState ={
    test: true
}

export const mainSlice = createSlice({
    name: "mainSlice",
    initialState: initialMainState,
    reducers: {
        setIsMintingTrue: (state) => {
            state.isMinting = true;
            state.log = "NEW TEST"
        },
        setIsMintingFalse: (state) => {
            state.isMinting = false;
        },
        setModalData: (state, action: PayloadAction<any>) => {
            state.txHash = action.payload[0]
            state.txStatus = action.payload[1]
        },
        setCurrentNGWSupply: (state, action: PayloadAction<number>) => {
            state.currentNGWSupply = action.payload
        }
    }
})

export const apiSlice = createSlice({
    name: "apiSlice",
    initialState: initialAPIState,
    reducers: {
        updateWarriorById: () => {
            const updateWarrior = async () => {
                try {
                    await axios.put("")
                } catch(e) {
                    console.error(e)
                }
            }
            updateWarrior()
        }
    }
})

export const { setIsMintingFalse, setIsMintingTrue, setModalData, setCurrentNGWSupply } = mainSlice.actions;

export const selectCount = (state: RootState) => state.mainSlice;

export default mainSlice.reducer;