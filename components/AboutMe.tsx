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

	const target = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
	useFrame((state) => {
		// console.log(target.current);
		// target.current.x = MathUtils.lerp(target.current.x, state.pointer.x * 1, 0.1); // lerp lookAt x
		// target.current.y = MathUtils.lerp(target.current.y, state.pointer.y * 1, 0.1); // lerp lookAt y

		state.camera.lookAt(target.current.x, target.current.y, target.current.z);
		state.camera.position.y = MathUtils.lerp(
			state.camera.position.y,
			Math.sin(scroll.offset) * 1 + 0.5,
			0.1
		);
		state.camera.position.z = MathUtils.lerp(
			state.camera.position.z,
			Math.cos(scroll.offset) * 1 + 3,
			0.1
		);

		const r1 = scroll.range(0 / 4, 1 / 4); // this is the first quarter of the page
		const r2 = scroll.range(1 / 4, 1 / 4); // this is the second quarter of the page
		// const r3 = scroll.visible(4 / 5, 1 / 5); // this is the last fifth of the page
		const r3 = scroll.range(1 / 4, 2 / 4); // this is the second quarter of the page
		icon1Ref.current.position.z = MathUtils.lerp(icon1Ref.current.position.z, r1 * 5, 0.1);
		icon2Ref.current.position.z = MathUtils.lerp(icon2Ref.current.position.z, r2 * 5, 0.1);
		icon3Ref.current.position.z = MathUtils.lerp(icon3Ref.current.position.z, r3 * 5, 0.1);

		const offset = 1 - scroll.offset;
		// console.log(offset);
	});
	function PointerPointLight() {
		const ref = useRef<THREE.PointLight>();
		// get pointer
		const scroll = useScroll();
		const { pointer } = useThree();
		useFrame(() => {
			ref.current.position.x = pointer.x * 1;
			ref.current.position.y = pointer.y * 1;
			ref.current.position.z = Math.sin(scroll.offset) * 10;
		});
		return (
			<pointLight
				ref={ref}
				position={[0, 0, 0]}
				intensity={1}
				distance={1}
				decay={1}
				color={icon1Hovered ? 'white' : 'red'}
				// color={'white'}
			/>
		);
	}

	return (
		<group position={[0, 0.75, 0]} ref={ref}>
			{/* <ambientLight intensity={1} /> */}
			<directionalLight position={[0, 5, 5]} intensity={1} />
			{/* <PointerPointLight /> */}
			{/* <spotLight
				intensity={100}
				position={[0, 15, 2]}
				angle={0.15}
				penumbra={1}
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				castShadow
			/> */}
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.25]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon1Ref} position={[-0.3, 0.33, 0]}>
					<Icons
						onPointerEnter={(e) => setIcon1Hovered(true)}
						onPointerLeave={(e) => setIcon1Hovered(false)}
					/>
				</group>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group
					ref={icon2Ref}
					onPointerEnter={(e) => setIcon2Hovered(true)}
					onPointerLeave={(e) => setIcon2Hovered(false)}
				>
					<Icons position={[0.33, 0, 0]} />
				</group>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[-0.2, 0]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group
					ref={icon3Ref}
					onPointerEnter={(e) => setIcon3Hovered(true)}
					onPointerLeave={(e) => setIcon3Hovered(false)}
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
