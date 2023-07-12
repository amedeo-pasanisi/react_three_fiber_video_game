import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        blocksCount: 10,
        blocksSeed: 0,
        //**
        /* Time
         */
        startTime: 0,
        endTime: 0,

        //**
        /* Phases
         */
        phase: 'ready',
        start: () => {set((state) =>{
            if (state.phase === 'ready') {
                return {phase: 'playing', startTime: Date.now()}
            }
            return {}
        })},
        restart: () => {set((state) =>{
            if (state.phase === 'playing' || state.phase === 'ended') {
                return {phase: 'ready', blocksSeed: Math.random()}
            }
            return {}
        })},
        end: () => {set((state) =>{
            if (state.phase === 'playing') {
                return {phase: 'ended', endTime: Date.now()}
            }
            return {}
        })},

        //**
        /* Div Controls
         */
        divForward: false,
        divForwardTap: () => {set(() =>{return {divForward: true}})},
        divForwardUntap: () => {set(() =>{return {divForward: false}})},
        divRightward: false,
        divRightwardTap: () => {set(() => {return {divRightward: true}})},
        divRightwardUntap: () => {set(() =>{return {divRightward: false}})},
        divBackward: false,
        divBackwardTap: () => {set(() => {return {divBackward: true}})},
        divBackwardUntap: () => {set(() =>{return {divBackward: false}})},
        divLeftward: false,
        divLeftwardTap: () => {set(() => {return {divLeftward: true}})},
        divLeftwardUntap: () => {set(() => {return {divLeftward: false}})},
        divJump: false,
        divJumpTap: () => {set(() => {return {divJump: true}})},
        divJumpUntap: () => {set(() => {return {divJump: false}})},

    }
}))