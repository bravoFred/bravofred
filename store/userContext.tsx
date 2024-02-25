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
	toggleTheme: () => {},
});
export function UserContextProvider(props) {
	const [mobile, setMobile] = useState(false); // device
	const [dev, setDev] = useState(process.env.NODE_ENV === 'development' ? true : false); // device
	const [activeTab, setActiveTab] = useState(true);
	const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // user
	useEffect(() => {
		if (window.innerWidth < window.innerHeight) setMobile(true); // if mobile
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
				toggleTheme,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
