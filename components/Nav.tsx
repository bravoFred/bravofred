import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use, useContext } from 'react';
import UserContextProvider from '../store/userContext';
export default function Nav() {
	const { theme, setTheme } = useContext(UserContextProvider);
	const { active, progress, errors, item, loaded, total } = useProgress();
	const startTime = useRef(new Date().getTime());
	const endTime = useRef(0);
	const loadTime = useRef(0);
	// console.log(active);

	useEffect(() => {
		// console.log(item);
		// console.log(progress);
		// console.log(total);

		if (!active) {
			endTime.current = new Date().getTime();
			loadTime.current = (endTime.current - startTime.current) / 1000;
			// setLoadTime(loadTime.current.toFixed(1));
		}
		// console.log(active);

		// console.log(loadTime.current.toFixed(1) + 's');
	}, [active, progress, item, loaded, total, errors]);
	// set timer
	const [done, setDone] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setDone(true);
		}, 500);
	}, []);

	return (
		<nav className={styles.navLoaded}>
			{/* <nav className={styles.navLoading}> */}
			<p
				className={styles.nav_text_loaded}
				style={{
					color: theme === 'dark' ? 'white' : 'black',
				}}
			>
				FREDERIC CARTIER
			</p>
		</nav>
	);
}
