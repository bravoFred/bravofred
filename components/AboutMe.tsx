import { Text3D, Float } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';

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
	const ref = useRef<THREE.Group>();
	const scroll = useScroll();
	const icon1Ref = useRef<THREE.Group>();

	const icon2Ref = useRef<THREE.Group>();
	const icon3Ref = useRef<THREE.Group>();
	const [icon1Hovered, setIcon1Hovered] = useState(false);
	const [icon2Hovered, setIcon2Hovered] = useState(false);
	const [icon3Hovered, setIcon3Hovered] = useState(false);
	const pointer = { x: 0, y: 0 };
	useFrame((state) => {
		state.camera.lookAt(0, 1, 0);
		// move camera with pointer
		// state.camera.position.set(pointer.x / 100, pointer.y / 100, 5);
		state.camera.position.x = MathUtils.lerp(
			state.camera.position.x,
			state.pointer.x * 0.5,
			0.2
		);
		state.camera.position.y = MathUtils.lerp(
			state.camera.position.y,
			state.pointer.y * 0.25 + 1.5,
			0.1
		);

		const offset = 1 - scroll.offset;
		console.log(offset);
		easing.damp(icon1Ref.current.position, 'z', -offset * 10, -50, 0.5);
		easing.damp(icon2Ref.current.position, 'z', -offset * 10, -50, 0.5);
		easing.damp(icon3Ref.current.position, 'z', -offset * 10, -50, 0.5);
	});
	function PointerPointLight() {
		useFrame(() => {});
		return (
			<pointLight
				position={[0, 0, 0]}
				intensity={1}
				distance={10}
				decay={2}
				color={icon1Hovered ? 'white' : 'red'}
			/>
		);
	}

	return (
		<group position={[0, 1, 0]} ref={ref}>
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
			{/* <FloatingIcon /> */}
			{/* <Text3D
					curveSegments={32}
					bevelEnabled
					bevelSize={0.01}
					bevelThickness={0.1}
					height={0.01}
					lineHeight={0.6}
					letterSpacing={0.1}
					size={1}
					font="/fonts/Inter_Bold.json"
					>
					{`FREDERIC\nCARTIER`}
					<meshStandardMaterial color="white" />
				</Text3D> */}
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.25]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon1Ref}>
					<Icons
						position={[-0.3, 0, 0]}
						// scale={icon1Hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
						onPointerEnter={(e) => setIcon1Hovered(true)}
						onPointerLeave={(e) => setIcon1Hovered(false)}
					/>
				</group>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[0, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon2Ref}>
					<Icons position={[0.33, 0, 0]} />
				</group>
			</Float>
			<Float
				speed={1} // Animation speed, defaults to 1
				rotationIntensity={2.5} // XYZ rotation intensity, defaults to 1
				floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
				floatingRange={[-0.2, 0]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
			>
				<group ref={icon3Ref}>
					<Icons position={[-0.3, 0, 0]} />
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
