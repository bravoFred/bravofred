import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
// <iframe src="https://player.vimeo.com/video/120547887?h=09b5b22e29&byline=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
{
	/* <p><a href="https://vimeo.com/120547887">ANIMATION</a> from <a href="https://vimeo.com/cinepobre">cinepobre.com</a> on <a href="https://vimeo.com">Vimeo</a>.</p> */
}
export default function VideoText(props) {
	const [video] = useState(() =>
		Object.assign(document.createElement('video'), {
			// src: 'https://www.youtube.com/watch?v=n9LgeoJE4EI',
			// src: 'https://player.vimeo.com/video/120547887?h=09b5b22e29&byline=0',
			src: '/window720.mp4',
			crossOrigin: 'Anonymous',
			loop: true,
			muted: true,
		})
	);
	useEffect(() => void video.play(), [video]);
	const [text, setText] = useState(`FREDERIC${'\n'}CARTIER`);
	return (
		<Text
			font="/fonts/NimbusSanL-Bol.woff"
			fontSize={0.15}
			letterSpacing={0}
			lineHeight={1}
			{...props}
			position={[0, 0, 0]}
			justify="center"
			textAlign="center"
			anchorX="center"
			anchorY="middle"
		>
			{text}

			<meshBasicMaterial toneMapped={false}>
				<videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
			</meshBasicMaterial>
		</Text>
	);
}
