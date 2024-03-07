import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';
import { MathUtils } from 'three';
import { easing, geometry } from 'maath';
import { useLocation } from 'wouter';
import { useControls, folder, button } from 'leva';

export default function ScrollNav() {
	const scroll = useScroll();
	const [lastScroll, setLastScroll] = useState(0);
	const [currentScroll, setCurrentScroll] = useState(0);
	const [scrollDirection, setScrollDirection] = useState(Math.sign(currentScroll - lastScroll));
	useFrame((state, delta) => {
		setCurrentScroll(scroll.offset);
		if (currentScroll > lastScroll) setScrollDirection(1);
		if (currentScroll < lastScroll) setScrollDirection(-1);
		setLastScroll(currentScroll);
		if (scrollDirection === 1) {
			console.log('scrolling down');
		}
		if (scrollDirection === -1) {
			console.log('scrolling up');
		}
	});

	return null;
}
