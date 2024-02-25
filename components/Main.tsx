import styles from '@/styles/App.module.css';
import FlickerTitle from '@/components/FlickerTitle';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import React, { Suspense, useRef, useState, useContext, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import {
	OrbitControls,
	AccumulativeShadows,
	RandomizedLight,
	Reflector,
	Text,
	ScrollControls,
} from '@react-three/drei';
import GridGround from '@/components/GridGround';
import Camera from '@/components/Camera';
import PortalsCube from './PortalsCube';
import PortalsCards from './Portals';
import FlickerText from './FlickerText';
import VideoText from './VideoText';
import Performance from './Performance';
import { useTexture } from '@react-three/drei';
import UserContextProvider from '../store/userContext';

import * as THREE from 'three';

export default function Main() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([-5, 5, 10]);
	const { theme, setTheme, frameloop } = useContext(UserContextProvider);
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
					dpr={[1, 1.5]}
					gl={{
						powerPreference: 'high-performance',
						antialias: false,
						logarithmicDepthBuffer: true,
						alpha: false,
					}}
					camera={{
						// fov: 45,
						fov: 30,
						near: 0.1,
						far: 50,
						zoom: 1,
						position: new THREE.Vector3(0, 0.4, 5),
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
					<spotLight
						// intensity={0.6}
						intensity={0.3}
						position={[0, 10, 0]}
						angle={0.15}
						penumbra={1}
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
						castShadow
					/>
					<fog attach="fog" args={['black', 15, 20]} />

					{/* <Camera /> */}
					{/* <Ground /> */}
					{/* <VideoText /> */}
					<ScrollControls pages={1}>
						<PortalsCards />
					</ScrollControls>
					<Performance />
				</Canvas>
			</Suspense>
		</>
	);
}
