import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use, useContext } from 'react';
import UserContextProvider from '../store/userContext';
import InputContextProvider from '../store/inputContext';
import { useFrame } from '@react-three/fiber';

export default function Nav() {
	const { theme, setTheme } = useContext(UserContextProvider);
	const {
		activeObject,
		portalsActive,
		aboutMeActive,
		goToHome,
		portal1active,
		portal2active,
		portal3active,
		gotoAboutMe,
		gotoPortals,
	} = useContext(InputContextProvider);
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
	const [aboutMeActiveState, setAboutMeActiveState] = useState(true);
	const [portalsActiveState, setPortalsActiveState] = useState(false);

	const clickHandler = (e) => {
		const { innerText } = e.target;
		if (innerText === 'About Me') gotoAboutMe();
		if (innerText === 'Coming Soon') gotoPortals();
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
		<nav className={styles.nav}>
			<p
				className={styles.nav_logo}
				style={{
					color: portal1active || portal2active || portal3active ? 'black' : 'black',
				}}
				onClick={goToHome}
			>
				FREDERIC CARTIER
			</p>
			<div className={styles.nav_links}>
				<p
					className={`${styles.nav_link} ${aboutMeActiveState ? styles.active : ''}`}
					style={{
						color: portal1active || portal2active || portal3active ? 'black' : 'black',
					}}
					onClick={gotoAboutMe}
				>
					About Me
				</p>
				<p
					className={`${styles.nav_link} ${portalsActiveState ? styles.active : ''}`}
					style={{
						color: portal1active || portal2active || portal3active ? 'black' : 'black',
					}}
					onClick={gotoPortals}
				>
					Coming Soon
				</p>
			</div>
		</nav>
	);
}
