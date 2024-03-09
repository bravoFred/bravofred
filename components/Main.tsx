import styles from '@/styles/App.module.css';
import FlickerTitle from '@/components/FlickerTitle';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import ScrollNavButtons from '@/components/ScrollNavButtons';
const inter = Inter({ subsets: ['latin'] });
import React, { Suspense, useRef, useState, useContext, useEffect, use } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
	OrbitControls,
	AccumulativeShadows,
	RandomizedLight,
	Reflector,
	Text,
	ScrollControls,
	CameraShake,
	Loader,
	MeshReflectorMaterial,
} from '@react-three/drei';
import GridGround from '@/components/GridGround';
import Camera from '@/components/Camera';
import PortalsMain from './portals/PortalsMain';
import AboutMe from './aboutMe/AboutMe';
import Floor from './Floor';
import FlickerText from './FlickerText';
import VideoText from './VideoText';
import Nav from './Nav';
import Lighting from './Lighting';
import Performance from './Performance';
import ScrollNav from './ScrollNav';
import { useTexture } from '@react-three/drei';
import UserContextProvider from '../store/userContext';
import Mouse from './Mouse';

import * as THREE from 'three';
export default function Main() {
	const { theme, setTheme, frameloop, mobile } = useContext(UserContextProvider);
	const [aboutMeActive, setAboutMeActive] = useState(true);
	const [portalsActive, setPortalsActive] = useState(false);

	function gotoAboutMe() {
		setAboutMeActive(true);
		setPortalsActive(false);
	}
	function gotoPortals() {
		setAboutMeActive(false);
		setPortalsActive(true);
	}
	function prevSection() {
		gotoAboutMe();
	}
	function nextSection() {
		gotoPortals();
	}
	return (
		<>
			{/* <main className={`${styles.main} ${inter.className}`}> */}
			{/* <main className={`${styles.main}`}>
			</main> */}
			<Nav />
			<ScrollNavButtons prev={prevSection} next={nextSection} />
			<Suspense fallback={null}>
				<Canvas
					style={{ position: 'absolute' }}
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
						fov: mobile ? 45 : 30,
						near: 0.1,
						far: 45,
						zoom: 1,
						position: new THREE.Vector3(0, 1.5, 5),
					}}
				>
					{/* <GridGround theme={theme} /> */}
					<color args={[theme === 'light' ? '#fff' : '#000']} attach="background" />
					<fog attach="fog" args={[theme === 'light' ? '#fff' : '#000', 0, 15]} />
					{/* https://codesandbox.io/p/sandbox/m1-scrollcontrols-4m0d0 */}
					<ScrollControls pages={4}>
						<AboutMe active={aboutMeActive} />
						<PortalsMain active={portalsActive} />
						<ScrollNav />
						<Mouse />
						<Camera />
						<Floor />
						<Lighting />
					</ScrollControls>

					<Performance />
					{/* <VideoText /> */}
					{/* <Shake /> */}
				</Canvas>
			</Suspense>
		</>
	);
}
