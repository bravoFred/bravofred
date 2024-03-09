import { createContext, useState, useEffect, useRef, useContext } from 'react';

const UserContext = createContext({
	dev: false,
	mobile: false,
	frameloop: 'always' as 'always' | 'demand' | 'never',
	theme: 'dark',
	activeTab: true,
	portalsActive: false as any,
	aboutMeActive: true as any,
	setActiveTab: (boolean) => {},
	setFrameloop: (string) => {},
	setMobile: (boolean) => {},
	setTheme: (string) => {},
	toggleTheme: () => {},
	prevSection: () => {},
	nextSection: () => {},
});
export function UserContextProvider(props) {
	const [mobile, setMobile] = useState(false); // device
	const [dev, setDev] = useState(process.env.NODE_ENV === 'development' ? true : false); // device
	const [activeTab, setActiveTab] = useState(true);
	// const [theme, setTheme] = useState<'dark' | 'light'>(Math.random() > 0.5 ? 'dark' : 'light'); // user
	// const [theme, setTheme] = useState<'dark' | 'light'>('light'); // user
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
		// console.log(aboutMeActive.current, portalsActive.current);
	}
	function nextSection() {
		gotoPortals();
		// console.log(aboutMeActive.current, portalsActive.current);
	}
	useEffect(() => {
		window.innerWidth < window.innerHeight ? setMobile(true) : setMobile(false);
	}, []);
	useEffect(() => {
		function handleResize() {
			window.innerWidth < window.innerHeight ? setMobile(true) : setMobile(false);
			console.log('resize');
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	// listen for device rotation
	useEffect(() => {
		const handleOrientationChange = () => {
			window.innerWidth < window.innerHeight ? setMobile(true) : setMobile(false);

			console.log('orientation changed');
		};
		window.addEventListener('orientationchange', handleOrientationChange);
		return () => {
			window.removeEventListener('orientationchange', handleOrientationChange);
		};
	}, []);

	const [frameloop, setFrameloop] = useState<'always' | 'demand' | 'never'>(() => {
		return 'always';
	});

	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	// listen for window resize

	useEffect(() => {
		const handleVisibilityChange = () => {
			document.hidden ? setActiveTab(false) : setActiveTab(true);
		};
		document.addEventListener('visibilitychange', handleVisibilityChange, false);
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				dev,
				mobile,
				frameloop,
				activeTab,
				theme,
				aboutMeActive,
				portalsActive,
				prevSection,
				nextSection,
				setActiveTab,
				setFrameloop,
				setMobile,
				setTheme,
				toggleTheme,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
