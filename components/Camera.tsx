import { useFrame, useThree } from '@react-three/fiber';
export default function Camera() {
	const { gl, camera } = useThree();

	useFrame(() => {
		console.log(camera.position.y);
	});

	return null;
}
