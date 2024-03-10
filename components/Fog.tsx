import { useFrame } from '@react-three/fiber';
import { useState, useContext, useRef } from 'react';
import UserContextProvider from '@/store/userContext';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

export default function Fog(props: any) {
	const { theme } = useContext(UserContextProvider);

	function LerpColor(color, targetColor, speed) {
		color.r = THREE.MathUtils.lerp(color.r, targetColor.r, speed);
		color.g = THREE.MathUtils.lerp(color.g, targetColor.g, speed);
		color.b = THREE.MathUtils.lerp(color.b, targetColor.b, speed);
	}
	function LerpFogDistanceToTargetDistance(distance, targetDistance, speed) {
		fogRef.current.far = THREE.MathUtils.lerp(distance, targetDistance, speed);
	}

	const fogRef = useRef(null!);
	const changeSpeed = 0.1;
	const darkFog = new THREE.Color('#000');
	const lightFog = new THREE.Color('#ffffff');
	const scroll = useScroll();

	useFrame((state, delta) => {
		if (scroll.offset < 0.5) {
			LerpColor(fogRef.current.color, darkFog, changeSpeed);
		} else {
			LerpColor(fogRef.current.color, lightFog, changeSpeed);
		}
	});
	return <fog ref={fogRef} attach="fog" args={['#000', 0, 15]} />;
}
