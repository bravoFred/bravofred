// ignore errors in this file
// @ts-nocheck

import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { CycleRaycast } from '@react-three/drei';
import { useRef, useContext } from 'react';
import * as THREE from 'three';
import InputContext from '@/store/inputContext';
export default function Raycaster() {
	// const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 });
	const [objects, setObjects] = useState([]);

	useFrame((state) => {
		// raycaster logic here
		if (objects.length > 0) {
			// console.log(objects[0].distance, objects[0].object.name, objects[0].position);
			// console.log(objects[0]);
			console.log(objects[0].object.name);
			// console.log(objects[0].point);
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
