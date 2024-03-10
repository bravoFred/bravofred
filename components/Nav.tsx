import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use, useContext } from 'react';
import UserContextProvider from '../store/userContext';
import { useRoute, useLocation } from 'wouter';
import InputContextProvider from '../store/inputContext';

export default function Nav() {
	const { theme, setTheme } = useContext(UserContextProvider);
	const { activeObject, portalsActive, aboutMeActive } = useContext(InputContextProvider);
	const { active, progress, errors, item, loaded, total } = useProgress();
	const startTime = useRef(new Date().getTime());
	const endTime = useRef(0);
	const loadTime = useRef(0);
	const { prevSection, nextSection, goToHome } = useContext(InputContextProvider);

	useEffect(() => {
		if (!active) {
			endTime.current = new Date().getTime();
			loadTime.current = (endTime.current - startTime.current) / 1000;
		}
	}, [active, progress, item, loaded, total, errors]);
	// handle routing for nav

	return (
		<nav className={styles.navLoaded}>
			{/* <nav className={styles.navLoading}> */}
			<p
				className={styles.nav_text_loaded}
				style={{
					color: theme === 'dark' ? 'white' : 'black',
				}}
				onClick={goToHome}
			>
				FREDERIC CARTIER
			</p>
			<div className={styles.nav_links}>
				<p
					className={styles.nav_link}
					style={{
						color: theme === 'dark' ? 'white' : 'black',
					}}
					onClick={prevSection}
				>
					About Me
				</p>
				<p
					className={styles.nav_link}
					style={{
						color: theme === 'dark' ? 'white' : 'black',
					}}
					onClick={nextSection}
				>
					Coming Soon
				</p>
			</div>
		</nav>
	);
}
