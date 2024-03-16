import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { useScroll } from '@react-three/drei';
import { useRef, useContext } from 'react';
import InputContext from '@/store/inputContext';
export default function ScrollNav() {
	const {
		scrollSpeed,
		scrollDirection,
		scrolling,
		portalsActive,
		aboutMeActive,
		setAboutMeActive,
		setPortalsActive,
	} = useContext(InputContext);
	function checkScrollingUp() {
		if (scroll.offset > scrollSpeed.current) {
			scrollDirection.current = 1;
			scrolling.current = true;
			console.log('scrolling down');
			// if (speed.current > speedThreshold) {
			// 	setPortalsActive(true);
			// 	setAboutMeActive(false);
			// }
		}
	}
	function checkScrollingDown() {
		if (scroll.offset < scrollSpeed.current) {
			scrollDirection.current = -1;
			scrolling.current = true;
			console.log('scrolling up');
			// if (speed.current > speedThreshold) {
			// 	setAboutMeActive(true);
			// 	setPortalsActive(false);
			// }
		}
	}
	function checkStoppedScrolling() {
		if (scroll.offset === scrollSpeed.current) {
			scrollDirection.current = 0;
			scrolling.current = false;
			// console.log('stopped scrolling');
		}
	}
	const scroll = useScroll();
	const speed = useRef(0);
	const [stoppedMsgShown, setStoppedMsgShown] = useState(false);
	const speedThreshold = 0.25; // lower number = more sensitive, higher number = have to scroll faster to trigger
	useFrame((state) => {
		checkScrollingUp();
		checkScrollingDown();
		checkStoppedScrolling();

		scrollSpeed.current = scroll.offset;
		speed.current = scroll.delta * 100;
		// console.log(scroll.offset);
	});

	return null;
}
