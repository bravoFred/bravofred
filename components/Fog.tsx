import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
import { useContext } from 'react';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
export default function Fog() {
	function LerpColor(color, targetColor, speed) {
		color.r = THREE.MathUtils.lerp(color.r, targetColor.r, speed);
		color.g = THREE.MathUtils.lerp(color.g, targetColor.g, speed);
		color.b = THREE.MathUtils.lerp(color.b, targetColor.b, speed);
	}
}
