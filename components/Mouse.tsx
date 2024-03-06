import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
import { useContext, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { extend, useThree } from '@react-three/fiber';

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

	useFrame((state) => {
		// console.log(scroll.offset);

		if (!mobile) {
			state.camera.position.x = MathUtils.lerp(
				state.camera.position.x,
				state.pointer.x * (scroll.offset > 0.99 ? 2 : 0.5),
				0.2
			);
			state.camera.position.y = MathUtils.lerp(
				state.camera.position.y,
				state.pointer.y * (scroll.offset > 0.99 ? 2 : 0.5 + 1),
				0.1
			);
			// orbit camera around the center
			// state.camera.lookAt(0, 0, 0);
		}
	});
	return <>{/* <PointerPointLight /> */}</>;
}
