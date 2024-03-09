import { createContext, useState, useEffect, useRef } from 'react';

const InputContext = createContext({
	portalsActive: false as any,
	aboutMeActive: true as any,
	scrollSpeed: 0 as any,
	scrollDirection: 0 as any,
	scrolling: false as any,
	prevSection: () => {},
	nextSection: () => {},
});
export function InputContextProvider(props) {
	// const scroll = useScroll();
	const scrollSpeed = useRef(0);
	const scrollDirection = useRef(0);
	const scrolling = useRef(false);
	const aboutMeActive = useRef(true);
	const portalsActive = useRef(false);
	function gotoAboutMe() {
		aboutMeActive.current = true;
		portalsActive.current = false;
	}
	function gotoPortals() {
		aboutMeActive.current = false;
		portalsActive.current = true;
	}
	function prevSection() {
		gotoAboutMe();
	}
	function nextSection() {
		gotoPortals();
	}
	// listen for left and right arrow keys
	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === 'ArrowLeft') {
				prevSection();
			} else if (event.key === 'ArrowRight') {
				nextSection();
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<InputContext.Provider
			value={{
				scrollSpeed,
				scrollDirection,
				scrolling,
				aboutMeActive,
				portalsActive,
				prevSection,
				nextSection,
			}}
		>
			{props.children}
		</InputContext.Provider>
	);
}

export default InputContext;
