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
        divTapped: false,
        divForward: false,
        divForwardTap: () => {set(() =>{return {divTapped: true, divForward: true}})},
        divForwardUntap: () => {set(() =>{return {divTapped: false, divForward: false}})},
        divRightward: false,
        divRightwardTap: () => {set(() => {return {divTapped: true, divRightward: true}})},
        divRightwardUntap: () => {set(() =>{return {divTapped: false, divRightward: false}})},
        divBackward: false,
        divBackwardTap: () => {set(() => {return {divTapped: true, divBackward: true}})},
        divBackwardUntap: () => {set(() =>{return {divTapped: false, divBackward: false}})},
        divLeftward: false,
        divLeftwardTap: () => {set(() => {return {divTapped: true, divLeftward: true}})},
        divLeftwardUntap: () => {set(() => {return {divTapped: false, divLeftward: false}})},
        divJump: false,
        divJumpTap: () => {set(() => {return {divTapped: true, divJump: true}})},
        divJumpUntap: () => {set(() => {return {divTapped: false, divJump: false}})},

    }
}))