import { Text3D, Float } from '@react-three/drei';
import { useScroll, MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useState, useContext } from 'react';
import { easing, geometry } from 'maath';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
export default function Floor() {
	const { mobile } = useContext(UserContextProvider);
	// const res = mobile ? 1024 : 2048;
	const res = mobile ? 1024 : 1024;
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
			<planeGeometry args={[50, 50]} />
			<MeshReflectorMaterial
				blur={[300, 100]}
				resolution={res}
				mixBlur={1}
				mixStrength={80}
				roughness={0.75}
				depthScale={1.2}
				minDepthThreshold={0.4}
				maxDepthThreshold={1.4}
				color="#050505"
				metalness={0.5}
				mirror={0.5}
			/>
		</mesh>
	);
}
