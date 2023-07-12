import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[  // Array of keys to observe. Every key is an object with a name and an array of keys.
            {name: 'forward', keys: ['ArrowUp', 'KeyW']},
            {name: 'backward', keys: ['ArrowDown', 'KeyS']},
            {name: 'leftward', keys: ['ArrowLeft', 'KeyA']},
            {name: 'rightward', keys: ['ArrowRight', 'KeyD']},
            {name: 'jump', keys: ['Space']}
        ]}
    >
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2.5, 4, 6 ]
            } }
        >
            <Experience />
        </Canvas>
        <Interface />
    </KeyboardControls>
)