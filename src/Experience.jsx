import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import { Physics } from '@react-three/rapier'
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'

export default function Experience() {

    const blocksCount = useGame(state => state.blocksCount)

    return <>
        <Physics>
            <Lights />
            <Level count={blocksCount} />
            <Player />
        </Physics>
    </>
}