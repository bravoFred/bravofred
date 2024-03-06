import { Text3D, Float } from '@react-three/drei';
import { useScroll, SpotLight } from '@react-three/drei';
import { use, useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
export default function Lighting() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([-5, 5, 10]);
	const { mobile } = useContext(UserContextProvider);
	const shadowMapSize = mobile ? 1024 : 4096;
	useFrame(() => {});
	function MovingSpot({ vec = new THREE.Vector3(0, 10, 0), ...props }) {
		const light = useRef(null!);
		const viewport = useThree((state) => state.viewport);
		useFrame((state) => {
			light.current.target.position.lerp(
				vec.set(
					(state.pointer.x * viewport.width) / 2,
					(state.pointer.y * viewport.height) / 2,
					0
				),
				0.1
			);
			light.current.target.updateMatrixWorld();
		});
		return (
			<SpotLight
				castShadow
				ref={light}
				penumbra={1}
				distance={10}
				angle={0.45}
				attenuation={2}
				anglePower={4}
				intensity={3}
				{...props}
			/>
		);
	}
	return (
		<group>
			{/* <ambientLight intensity={0.5} /> */}
			{/* <spotLight
				position={[0, 10, 10]}
				intensity={1}
				castShadow
				shadow-mapSize-width={shadowMapSize}
				shadow-mapSize-height={shadowMapSize}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/> */}
			<MovingSpot position={[0, 2.5, 1.5]} />
			<directionalLight
				position={[0, 10, 10]}
				intensity={0}
				castShadow
				shadow-mapSize-width={shadowMapSize}
				shadow-mapSize-height={shadowMapSize}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			{/* <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}
			<pointLight position={[0, 1, 0]} intensity={0.5} />
		</group>
	);
}
