import styles from '@/styles/App.module.css';
import { Inter } from 'next/font/google';
import ScrollNavButtons from '@/components/ScrollNavButtons';
// const inter = Inter({ subsets: ['latin'] });
import React, { Suspense, useRef, useState, useContext, useEffect, use } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
	ScrollControls,
	Billboard,
	ScreenSpace,
	ScreenSizer,
	Environment,
} from '@react-three/drei';
import Camera from '@/components/Camera';
import PortalsMain from './portals/PortalsMain';
import AboutMe from './aboutMe/AboutMe';
import Floor from './Floor';
import Nav from './Nav';
import Lighting from './Lighting';
import Performance from './Performance';
import GridGround from './GridGround';
import ScrollController from './ScrollController';
import Raycaster from './Raycaster';
import BackgroundColor from './BackgroundColor';
import Fog from './Fog';
import UserContextProvider from '../store/userContext';
import Mouse from './Mouse';
import dynamic from 'next/dynamic';
import Tip from './Tip';
const SmallRoom = dynamic(
	() => import('../models/4096/PortalInteriorJoined').then((mod) => mod.Model),
	{
		ssr: false,
	}
);
import * as THREE from 'three';
export default function Main() {
	const { theme, setTheme, frameloop, mobile } = useContext(UserContextProvider);

	return (
		<>
			{/* <main className={`${styles.main} ${inter.className}`}> */}
			{/* <main className={`${styles.main}`}>
			</main> */}
			<Nav />
			<Tip />
			{/* <ScrollNavButtons prev={prevSection} next={nextSection} /> */}
			<ScrollNavButtons />
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
						// fov: mobile ? 45 : 30, // my fov
						fov: mobile ? 45 : 70, // fov from codesandbox
						near: 0.1,
						far: 45,
						zoom: 1,
						position: new THREE.Vector3(0, 1, 5),
					}}
				>
					{/* <color args={[theme === 'light' ? '#fff' : '#000']} attach="background" /> */}
					{/* <fog attach="fog" args={[theme === 'light' ? '#fff' : '#000', 0, 0]} /> */}
					<ScrollControls pages={2}>
						<GridGround theme={theme} />
						<AboutMe />
						<PortalsMain />
						<ScrollController />
						{/* <Mouse /> */}
						<Camera />
						{/* <Floor /> */}
						<Raycaster />
						<Lighting />
						<BackgroundColor />
						<Fog />
					</ScrollControls>
					{/* <Environment preset="city" /> */}

					{/* <Billboard
						follow={true}
						lockX={false}
						lockY={false}
						lockZ={false} // Lock the rotation on the z axis (default=false)
					>
						<SmallRoom
							scale={[0.25, 0.25, 0.25]}
							position={[2, 0, 0]}
							rotation={[0, Math.PI * 3, 0]}
						/>
					</Billboard> */}
					{/* <ScreenSpace
						depth={1} 
					>
						<group position={[0.5, -0.1, 0]} rotation={[0, Math.PI * 3.85, 0]}>
							<pointLight position={[0, 0, 0]} intensity={0.1} />
							<SmallRoom
								scale={[navScale, navScale, navScale]}
								position={[0, 0, 0]}
							/>
						</group>
					</ScreenSpace> */}
					{/* <ScreenSizer
						scale={10} // scale factor
					>
						<SmallRoom position={[10, 0, 0]} />
					</ScreenSizer> */}
					<Performance />
					{/* <VideoText /> */}
					{/* <Shake /> */}
				</Canvas>
			</Suspense>
		</>
	);
}
