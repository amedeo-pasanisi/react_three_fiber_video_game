import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Player() {
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    useFrame((state, delta) =>{
        const {forward, backward, leftward, rightward} = getKeys()
        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}
        const impulseStrenght = 0.6 * delta
        const torqueStrenght = 0.2 * delta
        if(forward) {
            impulse.z -= impulseStrenght
            torque.x -= torqueStrenght
        }
        if(rightward) {
            impulse.x += impulseStrenght
            torque.z -= torqueStrenght
        }
        if(backward) {
            impulse.z += impulseStrenght
            torque.x += torqueStrenght
        }
        if(leftward) {
            impulse.x -= impulseStrenght
            torque.z += torqueStrenght
        }
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
    })

    return <RigidBody
        ref={body}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 1, 0]}>
        <mesh castShadow>
            <icosahedronGeometry args={ [0.3, 1]} />
            <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
    </RigidBody>
}