import { Text3D, Float } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
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

	useFrame(() => {
		const offset = 1 - scroll.offset;
		ref.current.position.y = offset * 2;
	});

	return (
		<group position={[-2, 0, -5]} ref={ref}>
			<ambientLight intensity={1} />
			<directionalLight position={[10, 10, 10]} />
			<Float>
				<spotLight
					intensity={3}
					position={[0, 10, 0]}
					angle={0.15}
					penumbra={1}
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
					castShadow
				/>
				<FloatingIcon />
				<Text3D
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
					{/* <meshNormalMaterial /> */}
					<meshStandardMaterial color="white" />
				</Text3D>
			</Float>
		</group>
	);
}
