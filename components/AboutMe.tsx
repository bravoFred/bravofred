import { Text3D, Float } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
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
