import { Text3D, Float } from '@react-three/drei';
import { useScroll, DeviceOrientationControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import { MoveGroup } from '../AnimationFunctions';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';

const Icons = dynamic(() => import('../../models/4096/Icons').then((mod) => mod.Model), {
	ssr: false,
});
const NavCam = dynamic(() => import('../../models/4096/Cam').then((mod) => mod.Model), {
	ssr: false,
});

export default function AboutMe() {
	const { mobile } = useContext(UserContextProvider);
	const { aboutMeActive, portalsActive } = useContext(InputContextProvider);
	const ref = useRef<THREE.Group>();
	const scroll = useScroll();
	const r1 = scroll.range(0 / 4, 1 / 4);
	const r2 = scroll.range(1 / 4, 1 / 4);
	const r3 = scroll.visible(4 / 5, 1 / 5);
	const { width, height } = useThree((state) => state.viewport);
	const icon1Ref = useRef<THREE.Group>();

	const icon2Ref = useRef<THREE.Group>();
	const icon3Ref = useRef<THREE.Group>();
	const [icon1Hovered, setIcon1Hovered] = useState(false);
	const [icon2Hovered, setIcon2Hovered] = useState(false);
	const [icon3Hovered, setIcon3Hovered] = useState(false);
	const [exitSpeed, setExitSpeed] = useState(0.025);
	const [icon1, setIcon1] = useState({
		active: new THREE.Vector3(0, 0, 0),
		hidden: new THREE.Vector3(0, 0, 20),
		enterSpeed: 0.2,
		exitSpeed: 0.025,
	});
	const [icon2, setIcon2] = useState({
		active: new THREE.Vector3(0, 0, 0),
		hidden: new THREE.Vector3(0, 0, 25),
		enterSpeed: 0.15,
		exitSpeed: 0.025,
	});
	const [icon3, setIcon3] = useState({
		active: new THREE.Vector3(0, 0, 0),
		hidden: new THREE.Vector3(0, 0, 30),
		enterSpeed: 0.1,
		exitSpeed: 0.025,
	});

	const enterSpeed = 0.2;

	useFrame(({ gl, scene, camera, clock, pointer }) => {
		const iconR1 = scroll.range(0 / 10, 0.25 / 10); // this is first one tenth of the page
		const iconR2 = scroll.range(0.25 / 10, 0.5 / 10); // this is the second one tenth of the page
		const iconR3 = scroll.range(0.5 / 10, 0.75 / 10);

		if (aboutMeActive.current) {
			MoveGroup(icon1Ref, icon1.active, icon1.enterSpeed);
			MoveGroup(icon2Ref, icon2.active, icon2.enterSpeed);
			MoveGroup(icon3Ref, icon3.active, icon3.enterSpeed);
		}
		if (portalsActive.current) {
			MoveGroup(icon1Ref, icon1.hidden, icon1.exitSpeed);
			MoveGroup(icon2Ref, icon2.hidden, icon2.exitSpeed);
			MoveGroup(icon3Ref, icon3.hidden, icon3.exitSpeed);
		}
	});
	const floatIntensity = 1;
	const rotationIntensity = 2;
	const speed = 1.5;

	const urls = {
		instagram: 'https://www.instagram.com/',
		vimeo: 'https://www.vimeo.com/',
		youtube: 'https://www.youtube.com/',
	};
	const pointerMissed = (e) => {};
	const openLink = (url) => {
		console.log(`opening link: ${url}`);
		window.open(url, '_blank');
	};
	const clickHandler = (e, url) => {
		if (mobile) return;
		openLink(url);
	};
	const doubleClickHandler = (e, url) => {
		if (!mobile) return;
		openLink(url);
	};
	return (
		<group position={[0, 0.75, 0]} ref={ref}>
			<Float
				speed={speed} // Animation speed, defaults to 1
				rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
				floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon1Ref} position={[-0.3, 0.33, -100]}>
					<Icons
						onPointerEnter={(e) => {
							setIcon1Hovered(true);
							document.body.style.cursor = 'pointer';
						}}
						onPointerLeave={(e) => {
							setIcon1Hovered(false);
							document.body.style.cursor = 'auto';
						}}
						onClick={(e) => clickHandler(e, urls.instagram)}
						onDoubleClick={(e) => doubleClickHandler(e, urls.instagram)}
						onPointerMissed={(e) => pointerMissed(e)}
					/>
				</group>
			</Float>
			<Float
				speed={speed} // Animation speed, defaults to 1
				rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
				floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[-0.05, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group
					ref={icon2Ref}
					position={[0.33, 0, -100]}
					onPointerEnter={(e) => {
						setIcon2Hovered(true);
						document.body.style.cursor = 'pointer';
					}}
					onPointerLeave={(e) => {
						setIcon2Hovered(false);
						document.body.style.cursor = 'auto';
					}}
					onClick={(e) => clickHandler(e, urls.vimeo)}
					onDoubleClick={(e) => doubleClickHandler(e, urls.vimeo)}
					onPointerMissed={(e) => pointerMissed(e)}
				>
					<Icons />
				</group>
			</Float>
			<Float
				speed={speed} // Animation speed, defaults to 1
				rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
				floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[-0.1, 0]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group
					ref={icon3Ref}
					position={[-0.3, -0.33, -100]}
					onPointerEnter={(e) => {
						setIcon3Hovered(true);
						document.body.style.cursor = 'pointer';
					}}
					onPointerLeave={(e) => {
						setIcon3Hovered(false);
						document.body.style.cursor = 'auto';
					}}
					onClick={(e) => clickHandler(e, urls.youtube)}
					onDoubleClick={(e) => doubleClickHandler(e, urls.youtube)}
					onPointerMissed={(e) => pointerMissed(e)}
				>
					<Icons />
				</group>
				{/* <NavCam scale={0.5} position={[0, 0.5, 0]} /> */}
			</Float>
			{/* <Float>
				<Icons scale={[1, 1, 1]} position={[1, 1, 2]} />
			</Float> */}
			{/* <Float>
				<Icons scale={[1, 1, 1]} position={[0, -0.5, 2]} />
			</Float> */}
		</group>
	);
}
