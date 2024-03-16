import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
import { useContext, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { extend, useThree } from '@react-three/fiber';
import InputContextProvider from '../store/inputContext';

function PointerPointLight() {
	const ref = useRef<THREE.PointLight>();
	// get pointer
	const scroll = useScroll();
	const { pointer } = useThree();
	useFrame(() => {
		ref.current.position.x = pointer.x * 1;
		ref.current.position.y = pointer.y * 1;
		ref.current.position.z = Math.sin(scroll.offset) * 10;
	});
	return (
		<pointLight
			ref={ref}
			position={[0, 0, 0]}
			intensity={1}
			distance={1}
			decay={1}
			color={'white'}
		/>
	);
}
export default function Mouse() {
	const { mobile } = useContext(UserContextProvider);
	const scroll = useScroll();
	const { aboutMeActive, portalsActive } = useContext(InputContextProvider);

	useFrame((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		const pointer = state.pointer;

		if (!mobile) {
			if (aboutMeActive) {
				camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 5, 0.1);
				camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 0.5, 0.1);
			}
			if (portalsActive) {
			}
		}
	});
	return <></>;
}
