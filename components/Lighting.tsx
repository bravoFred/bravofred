import { Text3D, Float } from '@react-three/drei';
import { useScroll, SpotLight, Environment } from '@react-three/drei';
import { use, useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import { useControls, folder, button } from 'leva';

import UserContextProvider from '../store/userContext';
export default function Lighting() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([0, 2.5, 1.5]);
	const { mobile } = useContext(UserContextProvider);
	const shadowMapSize = mobile ? 1024 : 4096;
	function MovingSpot({ vec = new THREE.Vector3(0, 10, 0), ...props }) {
		const light = useRef(null!);
		const viewport = useThree((state) => state.viewport);
		useFrame((state) => {
			light.current.target.position.lerp(
				vec.set(
					(state.pointer.x * viewport.width) / 2,
					(state.pointer.y * viewport.height) / 2,
					-0.5
				),
				0.1
			);
			light.current.target.updateMatrixWorld();
		});

		return (
			<SpotLight
				castShadow
				ref={light}
				penumbra={1} // how soft the edge of the spotlight is, 0 is hard, 1 is soft
				distance={10} // how far the light shines, starting from the light's position
				angle={0.45} // how wide the spotlight is, narrower is more like a flashlight, wider is more like a floodlight
				attenuation={2} // how quickly the light dims with distance, 0 is quicker dimming, 1 is slower dimming
				anglePower={4} // how much to increase the angle by
				intensity={3} // how bright the light is
				{...props}
			/>
		);
	}
	const sideLightIntensity = 1;
	// useControls('Lighting', {
	// 	lightPos: folder({
	// 		lightPos: lightPos,
	// 		// setLightPos: button(() => {
	// 		// 	setLightPos([0, 2.5, 1.5]);
	// 		// }),
	// 	}),
	// });
	return (
		<group>
			<MovingSpot position={lightPos} />
			<directionalLight
				position={lightPos}
				intensity={0.5}
				castShadow
				shadow-mapSize-width={shadowMapSize}
				shadow-mapSize-height={shadowMapSize}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>

			{/* left */}
			{/* right */}
			{/* front */}
			{/* <pointLight position={[0, 1, 3]} intensity={sideLightIntensity} /> */}
			{!mobile && (
				<>
					{/* <pointLight position={[-3, 0.25, 1]} intensity={sideLightIntensity} /> */}
					{/* <pointLight position={[-3, 3, 3]} intensity={sideLightIntensity} /> */}
					{/* <pointLight position={[3, 0.25, 1]} intensity={sideLightIntensity} /> */}
					{/* <pointLight position={[3, 3, 3]} intensity={sideLightIntensity} /> */}
				</>
			)}
		</group>
	);
}
