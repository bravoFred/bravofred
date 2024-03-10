import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';
import { useRef, useContext } from 'react';
import InputContext from '@/store/inputContext';
export default function ScrollNav() {
	const { scrollSpeed, scrollDirection, scrolling } = useContext(InputContext);
	const scroll = useScroll();
	const [stoppedMsgShown, setStoppedMsgShown] = useState(false);
	useFrame((state) => {
		if (scroll.offset > scrollSpeed.current) {
			scrollDirection.current = 1;
			scrolling.current = true;
			console.log('scrolling down');
			setStoppedMsgShown(false);
		} else if (scroll.offset < scrollSpeed.current) {
			scrollDirection.current = -1;
			scrolling.current = true;
			console.log('scrolling up');
			setStoppedMsgShown(false);
		}
		if (scroll.offset === scrollSpeed.current) {
			scrollDirection.current = 0;
			scrolling.current = false;
			if (!stoppedMsgShown) console.log('stopped scrolling');
			setStoppedMsgShown(true);
		}
		scrollSpeed.current = scroll.offset;
	});

	return null;
}
