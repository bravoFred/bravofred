// @ts-nocheck

import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { CycleRaycast } from '@react-three/drei';
import { useRef, useContext } from 'react';
import * as THREE from 'three';
import InputContext from '@/store/inputContext';
export default function Raycaster() {
	const [objects, setObjects] = useState([]);
	const {
		activeObject,
		portal1active,
		portal2active,
		portal3active,
		aboutMeActive,
		portalsActive,
	} = useContext(InputContext);
	useFrame((state) => {
		if (aboutMeActive) {
			if (objects.length > 0) {
				activeObject.current = objects[0];
				// console.log(activeObject.current);
			} else {
				activeObject.current = null;
			}
		}
		if (portalsActive) {
			activeObject.current = null;
		}
	});
	return (
		<>
			<CycleRaycast
				preventDefault={true} // Call event.preventDefault() (default: true)
				scroll={true} // Wheel events (default: true)
				keyCode={9} // Keyboard events (default: 9 [Tab])
				onChanged={(objects, cycle) => setObjects(objects)}
			/>
		</>
	);
}
