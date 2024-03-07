import { Text3D, Float } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';

const Icons = dynamic(() => import('../models/4096/Icons').then((mod) => mod.Model), {
	ssr: false,
});
// extend({ Text3D });
function FloatingIcon() {
	return (
		<group>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0.8, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="red" />
				</mesh>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0.8, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<mesh position={[1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="red" />
				</mesh>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0.8, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="red" />
				</mesh>
			</Float>
		</group>
	);
}
export default function AboutMe() {
	const { mobile } = useContext(UserContextProvider);
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
	// extract controls target

	// const target = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

	useFrame(({ gl, scene, camera, clock, pointer }) => {
		// target.current.x = MathUtils.lerp(target.current.x, state.pointer.x * 1, 0.1); // lerp lookAt x
		// target.current.y = MathUtils.lerp(target.current.y, pointer.y * 1, 0.1); // lerp lookAt y

		// const r1 = scroll.range(0 / 10, 1 / 10); // this is the first quarter of the page
		// const r2 = scroll.range(1 / 10, 2 / 10); // this is the second quarter of the page
		// const r3 = scroll.range(1 / 4, 2 / 4); // this is the second quarter of the page
		// const r3 = scroll.visible(4 / 5, 1 / 5); // this is the last fifth of the page
		const iconR1 = scroll.range(0 / 10, 0.25 / 10); // this is first one tenth of the page
		const iconR2 = scroll.range(0.25 / 10, 0.5 / 10); // this is the second one tenth of the page
		const iconR3 = scroll.range(0.5 / 10, 0.75 / 10);
		console.log(iconR1, iconR2, iconR3);

		icon1Ref.current.position.z = MathUtils.lerp(icon1Ref.current.position.z, iconR1 * 5, 0.1);
		icon2Ref.current.position.z = MathUtils.lerp(icon2Ref.current.position.z, iconR2 * 5, 0.1);
		icon3Ref.current.position.z = MathUtils.lerp(icon3Ref.current.position.z, iconR3 * 5, 0.1);

		const offset = 1 - scroll.offset;
	});
	const floatIntensity = 1;
	const rotationIntensity = 2;
	const speed = 1.5;
	// instagram, vimeo, youtube
	return (
		<group position={[0, 0.75, 0]} ref={ref}>
			<Float
				speed={speed} // Animation speed, defaults to 1
				rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
				floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon1Ref} position={[-0.3, 0.33, 0]}>
					<Icons
						onPointerEnter={(e) => {
							setIcon1Hovered(true);
							document.body.style.cursor = 'pointer';
						}}
						onPointerLeave={(e) => {
							setIcon1Hovered(false);
							document.body.style.cursor = 'auto';
						}}
						onClick={(e) => {
							window.open('https://www.instagram.com/', '_blank');
						}}
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
					onPointerEnter={(e) => {
						setIcon2Hovered(true);
						document.body.style.cursor = 'pointer';
					}}
					onPointerLeave={(e) => {
						setIcon2Hovered(false);
						document.body.style.cursor = 'auto';
					}}
					// change mouse cursor on hover
					// onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
					onClick={(e) => {
						window.open('https://www.vimeo.com/', '_blank');
					}}
				>
					<Icons position={[0.33, 0, 0]} />
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
					onPointerEnter={(e) => {
						setIcon3Hovered(true);
						document.body.style.cursor = 'pointer';
					}}
					onPointerLeave={(e) => {
						setIcon3Hovered(false);
						document.body.style.cursor = 'auto';
					}}
					onClick={(e) => {
						window.open('https://www.youtube.com/', '_blank');
					}}
				>
					<Icons position={[-0.3, -0.33, 0]} />
				</group>
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
