import { useRapier ,RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGame from './stores/useGame.jsx'

export default function Player() {
    const body = useRef()
    const {rapier, world} = useRapier()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())
    
    const start = useGame(state => state.start)
    const end = useGame(state => state.end)
    const restart = useGame(state => state.restart)
    const blocksCount = useGame(state => state.blocksCount)
    const divForward = useGame(state => state.divForward)
    const divRightward = useGame(state => state.divRightward)
    const divBackward = useGame(state => state.divBackward)
    const divLeftward = useGame(state => state.divLeftward)

    const jump = () => {
        const origin = body.current.translation()  // return a vector 3 with center of the body coordinates
        origin.y -= 0.31  // lower the origin of the sphere
        const direction = {x: 0, y: -1, z: 0}
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)  // true will make all bodyes intersected by the ray as solid
        if(hit.toi < 0.15) {  // toi stands for time of impact
            body.current.applyImpulse({x: 0, y: 0.5, z: 0})
        }
    }

    const reset = () => {
        body.current.setTranslation({x: 0, y: 1, z:0})
        body.current.setLinvel({x: 0, y: 0, z:0})
        body.current.setAngvel({x: 0, y: 0, z:0})
    }

    const [subscribeKeys, getKeys] = useKeyboardControls()
    useEffect(() => {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => {
                if (value === 'ready') {
                    reset()
                }
            }
        )
        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if(value) {
                    jump()
                }
            }
        )
        const unsubscribeDivJump = useGame.subscribe(
            (state) => state.divJump,
            (value) => {
                if(value) {
                    jump()
                }
            }
        )
        const unsubscribeAny = subscribeKeys(() => {
            start()
        })
        const unsubscribeDivTaped = useGame.subscribe(
            (state) => state.divTapped,
            (value) => {
                if(value) {
                    start()
                }
            }
        )
        return () => {  //this is needed to subscribeKeys only once during developing
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeDivJump()
            unsubscribeAny()
            unsubscribeDivTaped()
        }
    }, [])
    
    useFrame((state, delta) =>{
        /**
         * Controls
         */
        const {forward, backward, leftward, rightward} = getKeys()
        // console.log(forward)
        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}
        const impulseStrenght = 0.6 * delta
        const torqueStrenght = 0.2 * delta
        if(forward || divForward) {
            impulse.z -= impulseStrenght
            torque.x -= torqueStrenght
        }
        if(rightward || divRightward) {
            impulse.x += impulseStrenght
            torque.z -= torqueStrenght
        }
        if(backward || divBackward) {
            impulse.z += impulseStrenght
            torque.x += torqueStrenght
        }
        if(leftward || divLeftward) {
            impulse.x -= impulseStrenght
            torque.z += torqueStrenght
        }
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.80
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)
        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        /**
         * Phases
         */
        if(bodyPosition.z < -(blocksCount * 4 + 2)) {
            end()
        }
        if(bodyPosition.y < -4) {
            restart()
        }
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