import { createContext, useState, useEffect, useRef } from 'react';

const InputContext = createContext({
	aboutMeActive: true as any,
	activeObject: {} as any,
	portalsActive: false as any,
	scrollDirection: 0 as any,
	scrolling: false as any,
	scrollSpeed: 0 as any,
	prevSection: () => {},
	nextSection: () => {},
	gotoAboutMe: () => {},
	gotoPortals: () => {},
	goToHome: () => {},
});
export function InputContextProvider(props) {
	// const scroll = useScroll();
	const scrollSpeed = useRef(0);
	const scrollDirection = useRef(0);
	const scrolling = useRef(false);
	const aboutMeActive = useRef(true);
	const portalsActive = useRef(false);
	const activeObject = useRef({});
	function gotoAboutMe() {
		aboutMeActive.current = true;
		portalsActive.current = false;
	}
	function gotoPortals() {
		aboutMeActive.current = false;
		portalsActive.current = true;
	}
	function goToHome() {
		if (window.location.pathname === '/' && portalsActive.current) {
			gotoAboutMe();
		}
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
				aboutMeActive,
				activeObject,
				portalsActive,
				scrollDirection,
				scrolling,
				scrollSpeed,
				prevSection,
				nextSection,
				gotoAboutMe,
				gotoPortals,
				goToHome,
			}}
		>
			{props.children}
		</InputContext.Provider>
	);
}

export default InputContext;
