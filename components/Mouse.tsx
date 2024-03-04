import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import UserContextProvider from '../store/userContext';
import { useContext } from 'react';
export default function Mouse() {
	const { mobile } = useContext(UserContextProvider);
	useFrame((state) => {
		if (!mobile) {
			state.camera.position.x = MathUtils.lerp(
				state.camera.position.x,
				state.pointer.x * 0.5,
				0.1
			);
			state.camera.position.y = MathUtils.lerp(
				state.camera.position.y,
				state.pointer.y * 0.5 + 0.5,
				0.05
			);
		}
	});
	return null;
}
