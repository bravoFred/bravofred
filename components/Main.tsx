import styles from '@/styles/App.module.css';
import FlickerTitle from '@/components/FlickerTitle';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import React, { Suspense, useRef, useState, useContext, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
	OrbitControls,
	AccumulativeShadows,
	RandomizedLight,
	Reflector,
	Text,
	ScrollControls,
	CameraShake,
} from '@react-three/drei';
import GridGround from '@/components/GridGround';
import Camera from '@/components/Camera';
import Portals from './Portals';
import AboutMe from './AboutMe';
import FlickerText from './FlickerText';
import VideoText from './VideoText';
import Performance from './Performance';
import { useTexture } from '@react-three/drei';
import UserContextProvider from '../store/userContext';

import * as THREE from 'three';

export default function Main() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([-5, 5, 10]);
	const { theme, setTheme, frameloop, mobile } = useContext(UserContextProvider);
	function Ground() {
		const [floor, normal] = useTexture([
			'/SurfaceImperfections003_1K_var1.jpg',
			'/SurfaceImperfections003_1K_Normal.jpg',
		]);
		return (
			<Reflector
				blur={[400, 100]}
				resolution={512}
				args={[10, 10]}
				mirror={0.5}
				mixBlur={6}
				mixStrength={1.5}
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
			>
				{/* {(Material, props) => (
				<Material
					color="#a0a0a0"
					metalness={0.4}
					roughnessMap={floor}
					normalMap={normal}
					normalScale={[2, 2]} 
					{...props}
				/>
			)} */}
			</Reflector>
		);
	}
	function Shake() {
		const [vec] = useState(() => new THREE.Vector3());
		const { camera, mouse } = useThree();
		// useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 10, 60), 0.05));
		return (
			// <CameraShake
			// 	maxYaw={0.01}
			// 	maxPitch={0.01}
			// 	maxRoll={0.01}
			// 	yawFrequency={0.25}
			// 	pitchFrequency={0.25}
			// 	rollFrequency={0.4}
			// />
			<CameraShake
				maxYaw={0.01} // Max amount camera can yaw in either direction
				maxPitch={0.01} // Max amount camera can pitch in either direction
				maxRoll={0.01} // Max amount camera can roll in either direction
				yawFrequency={0.25} // Frequency of the the yaw rotation
				pitchFrequency={0.25} // Frequency of the pitch rotation
				rollFrequency={0.2} // Frequency of the roll rotation
				intensity={0.5} // initial intensity of the shake
				decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
			/>
		);
	}
	return (
		<>
			<main className={`${styles.main} ${inter.className}`}>
				{/* <h1
					style={{
						color: theme === 'light' ? '#000' : '#fff',
					}}
				>
					FREDERIC CARTIER
				</h1> */}
				{/* <FlickerTitle title="coming soon" theme={theme} /> */}
			</main>
			<Suspense fallback={null}>
				<Canvas
					flat
					shadows
					frameloop={frameloop}
					// dpr={[1, 1.5]}
					dpr={[1, 1.5]}
					gl={{
						powerPreference: 'high-performance',
						antialias: false,
						logarithmicDepthBuffer: true,
						alpha: false,
					}}
					camera={{
						// fov: 45,
						fov: mobile ? 50 : 30,
						// 30,
						near: 0.1,
						far: 50,
						zoom: 1,
						position: new THREE.Vector3(0, 0, 5),
					}}
				>
					{/* <OrbitControls
						makeDefault
						enableDamping={true}
						dampingFactor={0.15}
						autoRotate={true}
						autoRotateSpeed={-0.5}
						enablePan={false}
						enableZoom={true}
						enableRotate={true}
						target={[0, 0.4, 0]}
					/> */}
					<GridGround theme={theme} />
					<color args={[theme === 'light' ? '#fff' : '#000']} attach="background" />
					{/* <spotLight
						intensity={0.3}
						position={[0, 10, 0]}
						angle={0.15}
						penumbra={1}
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
						castShadow
					/> */}
					{/* <directionalLight position={lightPos} intensity={0.5} castShadow /> */}
					<fog attach="fog" args={[theme === 'light' ? '#fff' : '#000', 10, 25]} />
					<ScrollControls pages={1}>
						<Portals />
						<AboutMe />
					</ScrollControls>
					{/* <Shake /> */}
					<Performance />
				</Canvas>
			</Suspense>
		</>
	);
}
