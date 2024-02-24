import { Text } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
export default function NeonFlickerText() {
	const [message, setMessage] = useState('Fred');
	const textRef = useRef();

	const { clock } = useThree();
	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();
		const flicker = Math.sin(t * 10) * 0.5 + 0.5;
		setMessage(flicker > 0.5 ? 'Fred' : 'Cartier');
	});
	return (
		<Text
			font="/fonts/NimbusSanL-Bol.woff"
			fontSize={0.04}
			anchorX="right"
			position={[0.0, -0.677, 0.01]}
			material-toneMapped={false}
		>
			{message}
		</Text>
	);
}
