import { Text3D, Float } from '@react-three/drei';
import { useScroll, DeviceOrientationControls, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import { LerpGroupPos, EaseGroupScale } from '../Animate';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';

const IconIG = dynamic(() => import('@/models/4096/IconIG').then((mod) => mod.Model), {
	ssr: false,
});
const IconVimeo = dynamic(() => import('@/models/4096/IconVimeo').then((mod) => mod.Model), {
	ssr: false,
});
const IconYT = dynamic(() => import('@/models/4096/IconYT').then((mod) => mod.Model), {
	ssr: false,
});
export default function AboutMe(props) {
	const { mobile } = useContext(UserContextProvider);
	const { aboutMeActive, portalsActive, scrolling, icon1Hovered, icon2Hovered, icon3Hovered } =
		useContext(InputContextProvider);
	const ref = useRef<THREE.Group>();
	const scroll = useScroll();
	const r1 = scroll.range(0 / 4, 1 / 4);
	const r2 = scroll.range(1 / 4, 1 / 4);
	const r3 = scroll.visible(4 / 5, 1 / 5);
	const icon3Ref = useRef<THREE.Group>();
	const icon1Ref = useRef<THREE.Group>();
	const icon2Ref = useRef<THREE.Group>();

	const baseSpeed = 0.1;
	const baseScale = mobile ? 0.66 : 0.66;
	const baseActiveScale = mobile ? 0.75 : 0.9;
	const scaleUpFactor = 0.25;
	const scaleDownFactor = 0.25;
	const scaleUpSpeed = 0.1;
	const scaleDownSpeed = 0.1;
	const [text, setText] = useState({
		ref: useRef<THREE.Group>(),
		active: mobile ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(-0.5, 1, 0.2),
		hidden: new THREE.Vector3(0, 0, 30),
		activeScale: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(0, 0, 0),
		enterSpeed: baseSpeed * 1.5,
		exitSpeed: baseSpeed / 4,
	});
	const [icon1, setIcon1] = useState({
		ref: useRef<THREE.Group>(),
		active: mobile ? new THREE.Vector3(-0.33, 0.9, 0) : new THREE.Vector3(0.65, 0.8, 0),
		hidden: new THREE.Vector3(0, 0, 20),
		scaleHovered: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed * 2,
		exitSpeed: baseSpeed / 4,
	});
	const [icon2, setIcon2] = useState({
		ref: useRef<THREE.Group>(),
		active: mobile ? new THREE.Vector3(0.33, 0.15, 0) : new THREE.Vector3(1.2, 0.4, 0),
		hidden: new THREE.Vector3(0, 0, 25),
		scaleHovered: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed * 1.5,
		exitSpeed: baseSpeed / 4,
	});
	const [icon3, setIcon3] = useState({
		ref: useRef<THREE.Group>(),
		active: mobile ? new THREE.Vector3(-0.33, -0.15, 0) : new THREE.Vector3(0.65, 0, 0),
		hidden: new THREE.Vector3(0, 0, 30),
		scaleHovered: new THREE.Vector3(baseActiveScale, baseActiveScale, baseActiveScale),
		hiddenScale: new THREE.Vector3(baseScale, baseScale, baseScale),
		enterSpeed: baseSpeed,
		exitSpeed: baseSpeed / 4,
	});

	useFrame(({ gl, scene, camera, clock, pointer }) => {
		if (aboutMeActive) {
			icon1Hovered.current
				? EaseGroupScale(icon1Ref, icon1.scaleHovered, scaleUpFactor, scaleUpSpeed)
				: EaseGroupScale(icon1Ref, icon1.hiddenScale, scaleDownFactor, scaleDownSpeed);
			icon2Hovered.current
				? EaseGroupScale(icon2Ref, icon2.scaleHovered, scaleUpFactor, scaleUpSpeed)
				: EaseGroupScale(icon2Ref, icon2.hiddenScale, scaleDownFactor, scaleDownSpeed);
			icon3Hovered.current
				? EaseGroupScale(icon3Ref, icon3.scaleHovered, scaleUpFactor, scaleUpSpeed)
				: EaseGroupScale(icon3Ref, icon3.hiddenScale, scaleDownFactor, scaleDownSpeed);
			LerpGroupPos(icon1Ref, icon1.active, icon1.enterSpeed);
			LerpGroupPos(icon2Ref, icon2.active, icon2.enterSpeed);
			LerpGroupPos(icon3Ref, icon3.active, icon3.enterSpeed);
			LerpGroupPos(text.ref, text.active, text.enterSpeed);
		}
		if (portalsActive) {
			LerpGroupPos(icon1Ref, icon1.hidden, icon1.exitSpeed);
			LerpGroupPos(icon2Ref, icon2.hidden, icon2.exitSpeed);
			LerpGroupPos(icon3Ref, icon3.hidden, icon3.exitSpeed);
			LerpGroupPos(text.ref, text.hidden, text.exitSpeed);
		}
	});
	const floatIntensity = 1;
	const rotationIntensity = 1;
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
	const [textMsg, setTextMsg] = useState(`Welcome to my creative world!
${'\n'}
I am a director currently based in Atlanta, GA.
${'\n'}
My films aim to explore the core of complex human experiences
${'\n'}
through the use of vehicles such as
${'\n'}
dark comedy, introspection, and social commentary.
${'\n'}
Whether you have a work inquiry or just want to say hello,
${'\n'}
please feel free to reach out.
${'\n'}
I strongly believe in the power of community and collaboration.
${'\n'}
I hope you have a good day.
${'\n'}
*virtual hug*
	`);
	const [mobileText, setMobileText] = useState(`Welcome to my creative world!
${'\n'}
I am a director currently based in Atlanta, GA.
${'\n'}
My films aim to explore the core
${'\n'}
of complex human experiences
${'\n'}
through the use of vehicles such as
${'\n'}
dark comedy, introspection, and social commentary.
${'\n'}
Whether you have a work inquiry
${'\n'}
or just want to say hello,
${'\n'}
please feel free to reach out.
${'\n'}
I strongly believe in the power of
${'\n'}
community and collaboration.
${'\n'}
I hope you have a good day.
${'\n'}
*virtual hug*
	`);
	return (
		<group position={[0, 0, 0]} ref={ref}>
			<Text
				ref={text.ref}
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={mobile ? 0.04 : 0.06}
				color={'#000000'}
				{...props}
				textAlign={mobile ? 'left' : 'left'}
				// letterSpacing={-0.05}
				// anchorY="center"
				// anchorX="center"
				lineHeight={mobile ? 0.45 : 0.5}
				position={[0, 0, 0]}
				material-toneMapped={false}
				rotation={[0.05, 0, 0]}
			>
				{mobile ? mobileText : textMsg}
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
					<IconIG />
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
					<IconVimeo />
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
					<IconYT />
				</group>
			</Float>
		</group>
	);
}
