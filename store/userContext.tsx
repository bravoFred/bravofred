import { createContext, useState, useEffect, useRef, useContext } from 'react';

const UserContext = createContext({
	dev: false,
	mobile: false,
	frameloop: 'always' as 'always' | 'demand' | 'never',
	theme: 'dark',
	isTabActive: true,
	setTheme: (string) => {},
	setFrameloop: (string) => {},
	setIsTabActive: (boolean) => {},
	toggleTheme: () => {},
});
export function UserContextProvider(props) {
	const [mobile, setMobile] = useState(false); // device
	const [dev, setDev] = useState(process.env.NODE_ENV === 'development' ? true : false); // device
	const [isTabActive, setIsTabActive] = useState(true);
	const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // user
	useEffect(() => {
		if (window.innerWidth < window.innerHeight) setMobile(true); // if mobile
	}, []);

	const [frameloop, setFrameloop] = useState<'always' | 'demand' | 'never'>(() => {
		return 'always';
	});
	useEffect(() => {
		mobile ? setTheme('light') : setTheme('dark');
	}, [mobile]);

	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	useEffect(() => {
		const handleVisibilityChange = () => {
			document.hidden ? setIsTabActive(false) : setIsTabActive(true);
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
				isTabActive,
				theme,
				setFrameloop,
				setTheme,
				setIsTabActive,
				toggleTheme,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
