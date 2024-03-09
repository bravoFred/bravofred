import { createContext, useState, useEffect, useRef, useContext } from 'react';

const UserContext = createContext({
	dev: false,
	mobile: false,
	frameloop: 'always' as 'always' | 'demand' | 'never',
	theme: 'dark',
	activeTab: true,
	setTheme: (string) => {},
	setFrameloop: (string) => {},
	setActiveTab: (boolean) => {},
	setMobile: (boolean) => {},
	toggleTheme: () => {},
});
export function UserContextProvider(props) {
	const [mobile, setMobile] = useState(false); // device
	const [dev, setDev] = useState(process.env.NODE_ENV === 'development' ? true : false); // device
	const [activeTab, setActiveTab] = useState(true);
	// const [theme, setTheme] = useState<'dark' | 'light'>(Math.random() > 0.5 ? 'dark' : 'light'); // user
	// const [theme, setTheme] = useState<'dark' | 'light'>('light'); // user
	const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // user
	useEffect(() => {
		window.innerWidth < window.innerHeight ? setMobile(true) : setMobile(false);
	}, []);
	useEffect(() => {
		function handleResize() {
			window.innerWidth < window.innerHeight ? setMobile(true) : setMobile(false);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
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
				setFrameloop,
				setTheme,
				setActiveTab,
				setMobile,
				toggleTheme,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
