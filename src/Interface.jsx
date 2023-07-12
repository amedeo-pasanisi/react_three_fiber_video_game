import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "./stores/useGame.jsx"

export default function Interface() {
    const restart = useGame(state => state.restart)
    const phase = useGame(state => state.phase)
    const divForward = useGame(state => state.divForward)
    const divForwardTap = useGame(state => state.divForwardTap)
    const divForwardUntap = useGame(state => state.divForwardUntap)
    const divRightward = useGame(state => state.divRightward)
    const divRightwardTap = useGame(state => state.divRightwardTap)
    const divRightwardUntap = useGame(state => state.divRightwardUntap)
    const divBackward = useGame(state => state.divBackward)
    const divBackwardTap = useGame(state => state.divBackwardTap)
    const divBackwardUntap = useGame(state => state.divBackwardUntap)
    const divLeftward = useGame(state => state.divLeftward)
    const divLeftwardTap = useGame(state => state.divLeftwardTap)
    const divLeftwardUntap = useGame(state => state.divLeftwardUntap)
    const divJump = useGame(state => state.divJump)
    const divJumpTap = useGame(state => state.divJumpTap)
    const divJumpUntap = useGame(state => state.divJumpUntap)

    
    const forward = useKeyboardControls(state => state.forward)
    const backward = useKeyboardControls(state => state.backward)
    const leftward = useKeyboardControls(state => state.leftward)
    const rightward = useKeyboardControls(state => state.rightward)
    const jump = useKeyboardControls(state => state.jump)
    
    const time = useRef()
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()
            let elapsedTime = 0
            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)
            if (time.current) {
                time.current.textContent = elapsedTime
            }
        })
        return () => {
            unsubscribeEffect()
        }
    }, [])

    return <div className="interface">
        {/* Time */}
        <div ref={time} className="time">0.00</div>

        {/* Restart */}
        {/* <div className="restart">Restart</div> */}
        {phase === 'ended' ? <div className="restart" onClick={restart}>Restart</div> : null}
        

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={`key ${forward || divForward ? 'active' : ''}`} onTouchStart={divForwardTap} onTouchEnd={divForwardUntap}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftward || divLeftward ? 'active' : ''}`} onTouchStart={divLeftwardTap} onTouchEnd={divLeftwardUntap}></div>
                <div className={`key ${backward || divBackward ? 'active' : ''}`} onTouchStart={divBackwardTap} onTouchEnd={divBackwardUntap}></div>
                <div className={`key ${rightward || divRightward ? 'active' : ''}`} onTouchStart={divRightwardTap} onTouchEnd={divRightwardUntap}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump || divJump? 'active' : ''}`} onTouchStart={divJumpTap} onTouchEnd={divJumpUntap}></div>
            </div>
        </div>
    </div>
}