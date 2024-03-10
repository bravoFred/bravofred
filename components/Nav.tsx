import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use, useContext } from 'react';
import UserContextProvider from '../store/userContext';
import { useRoute, useLocation } from 'wouter';
import InputContextProvider from '../store/inputContext';
import { useFrame } from '@react-three/fiber';

export default function Nav() {
	const { theme, setTheme } = useContext(UserContextProvider);
	const { activeObject, portalsActive, aboutMeActive, prevSection, nextSection, goToHome } =
		useContext(InputContextProvider);
	const { active, progress, errors, item, loaded, total } = useProgress();
	const startTime = useRef(new Date().getTime());
	const endTime = useRef(0);
	const loadTime = useRef(0);

	useEffect(() => {
		if (!active) {
			endTime.current = new Date().getTime();
			loadTime.current = (endTime.current - startTime.current) / 1000;
		}
	}, [active, progress, item, loaded, total, errors]);
	// handle routing for nav
	// check for changes to aboutMeActive and portalsActive
	const [aboutMeActiveState, setAboutMeActiveState] = useState(true);
	const [portalsActiveState, setPortalsActiveState] = useState(false);
	const clickHandler = (e) => {
		const { innerText } = e.target;
		if (innerText === 'About Me') {
			setAboutMeActiveState(true);
			setPortalsActiveState(false);
			prevSection();
		} else if (innerText === 'Coming Soon') {
			setPortalsActiveState(true);
			setAboutMeActiveState(false);
			nextSection();
		}
	};
	useEffect(() => {
		if (aboutMeActive) {
			setAboutMeActiveState(true);
			setPortalsActiveState(false);
		} else if (portalsActive) {
			setPortalsActiveState(true);
			setAboutMeActiveState(false);
		}
	}, [aboutMeActive, portalsActive]);
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
					className={`${styles.nav_link} ${aboutMeActiveState ? styles.active : ''}`}
					style={{
						color: theme === 'dark' ? 'white' : 'black',
					}}
					// onClick={prevSection}
					onClick={(e) => clickHandler(e)}
				>
					About Me
				</p>
				<p
					className={`${styles.nav_link} ${portalsActiveState ? styles.active : ''}`}
					style={{
						color: theme === 'dark' ? 'white' : 'black',
					}}
					// onClick={nextSection}
					onClick={(e) => clickHandler(e)}
				>
					Coming Soon
				</p>
			</div>
		</nav>
	);
}
