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
} from '@react-three/drei';
import GridGround from '@/components/GridGround';
import Camera from '@/components/Camera';
import PortalsCube from './PortalsCube';
import PortalsCards from './PortalsCards';
import FlickerText from './FlickerText';
import VideoText from './VideoText';
import { useTexture } from '@react-three/drei';

import * as THREE from 'three';

export default function Main() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([-5, 5, 10]);
	// const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');
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
					frameloop="always"
					dpr={[1, 2]}
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
						far: 100,
						zoom: 1,
						position: new THREE.Vector3(-2, 0.4, 5),
					}}
				>
					<OrbitControls
						makeDefault
						enableDamping={true}
						dampingFactor={0.15}
						autoRotate={true}
						autoRotateSpeed={-0.5}
						enablePan={false}
						enableZoom={true}
						enableRotate={true}
						target={[0, 0.4, 0]}
					/>
					<GridGround theme={theme} />
					<color args={[theme === 'light' ? '#fff' : '#000']} attach="background" />
					{/* <fog attach="fog" args={['red', 20, -5]} /> */}
					{/* <planeGeometry args={[100, 100]} /> */}
					{/* <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
						<planeBufferGeometry attach="geometry" args={[10, 10]} />
						<meshPhongMaterial attach="material" color="#1a1a1a" />
					</mesh> */}
					<spotLight
						// intensity={0.6}
						intensity={0.3}
						position={[0, 10, 0]}
						// position={lightPos}
						// angle={0.2}
						angle={0.15}
						// angle={2}
						penumbra={1}
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
						castShadow
					/>
					<fog attach="fog" args={['black', 15, 20]} />

					{/* <Camera /> */}
					{/* <PortalsCube /> */}
					{/* <Ground /> */}
					{/* <VideoText /> */}
					<PortalsCards />
					{/* <FlickerText /> */}
				</Canvas>
			</Suspense>
		</>
	);
}
