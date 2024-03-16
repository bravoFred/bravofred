import { createContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const InputContext = createContext({
	aboutMeActive: true as any,
	isHome: true as any,
	portal1active: false as any,
	portal2active: false as any,
	portal3active: false as any,
	activeObject: {} as any,
	portalsActive: false as any,
	scrollDirection: 0 as any,
	scrolling: false as any,
	scrollSpeed: 0 as any,
	icon1Hovered: false as any,
	icon2Hovered: false as any,
	icon3Hovered: false as any,
	gotoAboutMe: () => {},
	gotoPortals: () => {},
	goToHome: () => {},
	setAboutMeActive: (bool) => {},
	setPortalsActive: (bool) => {},
	setPortal1active: (bool) => {},
	setPortal2active: (bool) => {},
	setPortal3active: (bool) => {},
});
export function InputContextProvider(props) {
	// const scroll = useScroll();
	const router = useRouter();
	const scrollSpeed = useRef(0);
	const scrollDirection = useRef(0);
	const scrolling = useRef(false);
	const [aboutMeActive, setAboutMeActive] = useState(true);
	const [portalsActive, setPortalsActive] = useState(false);

	const activeObject = useRef({});
	const icon1Hovered = useRef(false);
	const icon2Hovered = useRef(false);
	const icon3Hovered = useRef(false);
	const [portal1active, setPortal1active] = useState(false);
	const [portal2active, setPortal2active] = useState(false);
	const [portal3active, setPortal3active] = useState(false);
	const [isHome, setIsHome] = useState(true);
	function goToHome() {
		activeObject.current = null;

		disablePortals();
		router.push('/');
		if (portalsActive) gotoAboutMe();
		if (portal1active || portal2active || portal3active) gotoPortals();
	}
	function gotoAboutMe() {
		router.push('/');
		disablePortals();
		setAboutMeActive(true);
		setPortalsActive(false);
		activeObject.current = null;
	}
	function gotoPortals() {
		disablePortals();
		router.push('/');
		setAboutMeActive(false);
		setPortalsActive(true);
		activeObject.current = null;
	}
	function disablePortals() {
		setPortal1active(false);
		setPortal2active(false);
		setPortal3active(false);
	}
	function goToPortal1() {
		disablePortals();
		setPortal1active(true);
	}
	function goToPortal2() {
		disablePortals();
		setPortal2active(true);
	}
	function goToPortal3() {
		disablePortals();
		setPortal3active(true);
	}

	// listen for left and right arrow keys
	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === 'ArrowLeft') gotoAboutMe();
			if (event.key === 'ArrowRight') gotoPortals();
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<InputContext.Provider
			value={{
				isHome,
				aboutMeActive,
				activeObject,
				portalsActive,
				scrollDirection,
				scrolling,
				scrollSpeed,
				portal1active,
				portal2active,
				portal3active,
				icon1Hovered,
				icon2Hovered,
				icon3Hovered,
				setAboutMeActive,
				setPortalsActive,
				gotoAboutMe,
				gotoPortals,
				goToHome,
				setPortal1active,
				setPortal2active,
				setPortal3active,
			}}
		>
			{props.children}
		</InputContext.Provider>
	);
}

export default InputContext;
