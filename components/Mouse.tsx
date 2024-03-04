import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
import { useContext } from 'react';
import { useScroll } from '@react-three/drei';
export default function Mouse() {
	const { mobile } = useContext(UserContextProvider);
	const scroll = useScroll();

	useFrame((state) => {
		console.log(scroll.offset);

		if (!mobile) {
			state.camera.position.x = MathUtils.lerp(
				state.camera.position.x,
				state.pointer.x * (scroll.offset > 0.99 ? 2 : 0.5),
				0.2
			);
			state.camera.position.y = MathUtils.lerp(
				state.camera.position.y,
				state.pointer.y * (scroll.offset > 0.99 ? 2 : 0.5),
				0.1
			);
			// orbit camera around the center
			// state.camera.lookAt(0, 0, 0);
		}
	});
	return null;
}
