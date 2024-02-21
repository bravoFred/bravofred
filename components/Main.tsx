import styles from '@/styles/App.module.css';
import FlickerTitle from '@/components/FlickerTitle';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import React, { Suspense, useRef, useState, useContext, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import GridGround from '@/components/GridGround';
import Camera from '@/components/Camera';

import * as THREE from 'three';

export default function Main() {
	const [lightPos, setLightPos] = useState<[number, number, number] | undefined>([-5, 5, 10]);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	return (
		<>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>FREDERIC CARTIER</h1>
				<FlickerTitle title="coming soon" />
			</main>
			<Suspense fallback={null}>
				<Canvas
					flat
					frameloop="always"
					dpr={[1, 2]}
					gl={{
						powerPreference: 'high-performance',
						antialias: true,
						logarithmicDepthBuffer: true,
					}}
					camera={{
						fov: 45,
						near: 0.1,
						far: 1000,
						zoom: 1,
						position: new THREE.Vector3(-10, 0.4, 10),
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
						target={[0, 2, 0]}
					/>
					<GridGround theme={theme} />
					{theme === 'light' && <color args={['#fff']} attach="background" />}
					{theme === 'dark' && <color args={['#000']} attach="background" />}
					<directionalLight
						intensity={0.1}
						position={lightPos}
						shadow-camera-far={100}
						shadow-camera-left={-50}
						shadow-camera-right={50}
						shadow-camera-top={50}
						shadow-camera-bottom={-100}
						shadow-mapSize={[512, 512]}
						castShadow
					/>
					<Camera />
					{/* <Performance /> */}
				</Canvas>
			</Suspense>
		</>
	);
}
