import React, {useEffect, useRef} from 'react';
import {angleToRadians} from "../utils/angleToRadians";
import {Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {gsap} from "gsap";

const Three = () => {
  const orbitalControlsRef = useRef(null);
  const ball = useRef(null);

  useFrame((state) => {
    if (!!orbitalControlsRef.current) {
      const { x, y } = state.mouse;

      orbitalControlsRef.current.setAzimuthalAngle(-angleToRadians(45) * x);
      orbitalControlsRef.current.setPolarAngle(y + 1 * angleToRadians(60))

      orbitalControlsRef.current.update();
    }
  });

  useEffect(() => {
    if (!!ball.current) {
      const timeline = gsap.timeline();

      timeline.to(ball.current.position, {
        x: -2,
        duration: 4,
        rotation: '1.25rad'
      })

      timeline.to(ball.current.position, {
        y: 0.5,
        duration: 3,
        ease: "bounce.out"
      }, '<')

    }
  }, [ball.current])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]}/>
      <OrbitControls
        ref={orbitalControlsRef}
        maxPolarAngle={angleToRadians(80)}
        minPolarAngle={angleToRadians(60)}
      />

      <mesh position={[4, 4, 0]} castShadow ref={ball}>
        <sphereGeometry args={[0.5, 32, 32]}/>
        <meshStandardMaterial color="#ffffff"  metalness={0.6} roughness={0.2}/>
      </mesh>

      <mesh rotation={[-(angleToRadians(90)), 0, 0 ]} receiveShadow>
        <planeGeometry args={[20, 20]}/>
        <meshStandardMaterial color="#1ea3d8"/>
      </mesh>

      <ambientLight args={["#ffffff", 0.25]} />
      <spotLight args={["#ffffff", 1.5, 10, angleToRadians(45), 0.4]} position={[-5, 1, 0]} castShadow />

      <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#2266cc" side={THREE.BackSide}/>
        </mesh>
      </Environment>
    </>
  );
};

export default Three;