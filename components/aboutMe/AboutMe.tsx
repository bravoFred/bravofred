import { Text3D, Float } from '@react-three/drei';
import { useScroll, DeviceOrientationControls, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import { LerpAll, ScaleAll } from '../AnimationFunctions';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';

const IconIG = dynamic(() => import('@/models/4096/IconIG').then((mod) => mod.Model), {
	ssr: false,
});
const Icons = dynamic(() => import('@/models/4096/Icons').then((mod) => mod.Model), {
	ssr: false,
});
const NavCam = dynamic(() => import('../../models/4096/Cam').then((mod) => mod.Model), {
	ssr: false,
});
function spinGroupAround(ref, speed) {
	const group = ref.current;
	const groupCurrentRotation = group.rotation.y;
	// console.log(groupCurrentRotation);
	// spin the group around the y-axis one time
	// if (groupCurrentRotation > Math.PI * 4) {
	group.rotation.y = groupCurrentRotation - Math.PI * 4;
	// }
}
export default function AboutMe(props) {
	const { mobile } = useContext(UserContextProvider);
	const { aboutMeActive, portalsActive, scrolling, icon1Hovered, icon2Hovered, icon3Hovered } =
		useContext(InputContextProvider);
	const ref = useRef<THREE.Group>();
	const scroll = useScroll();
	const r1 = scroll.range(0 / 4, 1 / 4);
	const r2 = scroll.range(1 / 4, 1 / 4);
	const r3 = scroll.visible(4 / 5, 1 / 5);
	const { width, height } = useThree((state) => state.viewport);
	const icon3Ref = useRef<THREE.Group>();
	const icon1Ref = useRef<THREE.Group>();
	const icon2Ref = useRef<THREE.Group>();

	const baseSpeed = 0.1;
	const baseScale = 1;
	const baseActiveScale = 1.1;
	const [icon1, setIcon1] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(-0.5, 0.5, 0),
		hidden: new THREE.Vector3(0, 0, 20),
		activeScale: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed * 2,
		exitSpeed: baseSpeed / 4,
	});
	const [icon2, setIcon2] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(0.75, 0.1, 0),
		hidden: new THREE.Vector3(0.5, 0, 25),
		activeScale: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed * 1.5,
		exitSpeed: baseSpeed / 4,
	});
	const [icon3, setIcon3] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(-0.25, -0.5, 0),
		hidden: new THREE.Vector3(0, 0, 30),
		activeScale: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed,
		exitSpeed: baseSpeed / 4,
	});
	const [text, setText] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(0, 1, 0),
		hidden: new THREE.Vector3(0, 0, 15),
		activeScale: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(0, 0, 0),
		enterSpeed: baseSpeed,
		exitSpeed: baseSpeed / 4,
	});

	useFrame(({ gl, scene, camera, clock, pointer }) => {
		const r1 = scroll.range(0 / 10, 1 / 10); // this is first one tenth of the page
		const r2 = scroll.range(0 / 10, 2 / 10); // this is the second one tenth of the page
		const r3 = scroll.range(0 / 10, 3 / 10);
		icon1Hovered.current
			? ScaleAll(icon1Ref, icon1.activeScale, 0.1)
			: ScaleAll(icon1Ref, icon1.hiddenScale, 0.1);
		icon2Hovered.current
			? ScaleAll(icon2Ref, icon2.activeScale, 0.1)
			: ScaleAll(icon2Ref, icon2.hiddenScale, 0.1);
		icon3Hovered.current
			? ScaleAll(icon3Ref, icon3.activeScale, 0.1)
			: ScaleAll(icon3Ref, icon3.hiddenScale, 0.1);

		if (aboutMeActive) {
			LerpAll(icon1Ref, icon1.active, icon1.enterSpeed);
			LerpAll(icon2Ref, icon2.active, icon2.enterSpeed);
			LerpAll(icon3Ref, icon3.active, icon3.enterSpeed);
			LerpAll(text.ref, text.active, text.enterSpeed);
		}
		if (portalsActive) {
			LerpAll(icon1Ref, icon1.hidden, icon1.exitSpeed);
			LerpAll(icon2Ref, icon2.hidden, icon2.exitSpeed);
			LerpAll(icon3Ref, icon3.hidden, icon3.exitSpeed);
			LerpAll(text.ref, text.hidden, text.exitSpeed);
		}
	});
	const floatIntensity = 1;
	const rotationIntensity = 1.5;
	const speed = 1.5;

	const urls = {
		instagram: 'https://www.instagram.com/bravoFred_/',
		vimeo: 'https://vimeo.com/bravofred',
		youtube: 'https://www.youtube.com/@bravoFred',
	};
	const pointerMissed = (e) => {
		disableHovers();
	};
	const openLink = (url) => {
		console.log(`opening link: ${url}`);
		window.open(url, '_blank');
	};
	const clickHandler = (id, e, url) => {
		if (id === 'icon1') icon1Hovered.current = true;
		if (id === 'icon2') icon2Hovered.current = true;
		if (id === 'icon3') icon3Hovered.current = true;

		if (mobile) return;
		openLink(url);
	};
	const doubleClickHandler = (e, url) => {
		if (!mobile) return;
		openLink(url);
	};
	const disableHovers = () => {
		icon1Hovered.current = false;
		icon2Hovered.current = false;
		icon3Hovered.current = false;
	};
	const hoverHandler = (e) => {
		if (e) {
			e.stopPropagation();
			document.body.style.cursor = 'pointer';
		}
	};
	const leaveHandler = (e) => {
		disableHovers();
		if (e) {
			e.stopPropagation();
			document.body.style.cursor = 'auto';
		}
	};
	const [textMsg, setTextMsg] = useState(`
	Lorem ipsum is placeholder text
	${'\n'}
	commonly used in industries
	${'\n'}
	for previewing layouts and mockups.`);

	return (
		<group position={[0, 0, 0]} ref={ref}>
			<Text
				ref={text.ref}
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.05}
				color={'#000000'}
				{...props}
				textAlign="center"
				// anchorY="center"
				// anchorX="center"
				lineHeight={0.5}
				position={[0, 0, 0]}
				material-toneMapped={false}
			>
				{textMsg}
			</Text>
			<Float
				speed={speed} // Animation speed, defaults to 1
				rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
				floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group
					ref={icon1Ref}
					position={[0, 0, -100]}
					onPointerEnter={(e) => {
						icon1Hovered.current = true;
						hoverHandler(e);
					}}
					onPointerLeave={(e) => {
						icon1Hovered.current = false;
						leaveHandler(e);
					}}
					onClick={(e) => clickHandler('icon1', e, urls.instagram)}
					onDoubleClick={(e) => doubleClickHandler(e, urls.instagram)}
					onPointerMissed={(e) => pointerMissed(e)}
				>
					<IconIG iconHovered={icon1Hovered} />
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
					position={[0, 0, -100]}
					onPointerEnter={(e) => {
						icon2Hovered.current = true;
						hoverHandler(e);
					}}
					onPointerLeave={(e) => {
						icon2Hovered.current = false;
						leaveHandler(e);
					}}
					onClick={(e) => clickHandler('icon2', e, urls.vimeo)}
					onDoubleClick={(e) => doubleClickHandler(e, urls.vimeo)}
					onPointerMissed={(e) => pointerMissed(e)}
				>
					<IconIG iconHovered={icon2Hovered} />
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
					position={[0, 0, -100]}
					onPointerEnter={(e) => {
						icon3Hovered.current = true;
						hoverHandler(e);
					}}
					onPointerLeave={(e) => {
						icon3Hovered.current = false;
						leaveHandler(e);
					}}
					onClick={(e) => clickHandler('icon3', e, urls.youtube)}
					onDoubleClick={(e) => doubleClickHandler(e, urls.youtube)}
					onPointerMissed={(e) => pointerMissed(e)}
				>
					<IconIG iconHovered={icon3Hovered} />
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
