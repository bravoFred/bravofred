import { useGLTF, Cloud, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState, useContext, useRef } from 'react';
import UserContextProvider from '@/store/userContext';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useScroll } from '@react-three/drei';

export default function BackgroundColor(props: any) {
	const { theme, mobile } = useContext(UserContextProvider);

	function LerpColorToTargetColor(color, targetColor, speed) {
		color.r = THREE.MathUtils.lerp(color.r, targetColor.r, speed);
		color.g = THREE.MathUtils.lerp(color.g, targetColor.g, speed);
		color.b = THREE.MathUtils.lerp(color.b, targetColor.b, speed);
	}
	const color = useRef(null!);
	const changeSpeed = 0.1;

	const white = new THREE.Color('#ffffff');
	const black = new THREE.Color('#000');
	const scroll = useScroll();

	useFrame((state, delta) => {
		// change from black to white on scroll
		// console.log(scroll.offset);

		if (scroll.offset < 0.5) {
			LerpColorToTargetColor(color.current, black, changeSpeed);
		} else {
			LerpColorToTargetColor(color.current, white, changeSpeed);
		}
	});
	return <color ref={color} args={['#000']} attach="background" />;
}
