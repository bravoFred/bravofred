import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use, useContext } from 'react';
import UserContextProvider from '../store/userContext';
import { useRoute, useLocation } from 'wouter';
import InputContextProvider from '../store/inputContext';
import { useFrame } from '@react-three/fiber';
import { useRouter } from 'next/router';

export default function Nav() {
	const { theme, setTheme } = useContext(UserContextProvider);
	const {
		activeObject,
		portalsActive,
		aboutMeActive,
		prevSection,
		nextSection,
		goToHome,
		isHome,
		portal1active,
		portal2active,
		portal3active,
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
	// handle routing for nav
	// check for changes to aboutMeActive and portalsActive
	const [aboutMeActiveState, setAboutMeActiveState] = useState(true);
	const [portalsActiveState, setPortalsActiveState] = useState(false);
	// const [location, setLocation] = useLocation();
	const router = useRouter();

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
		<nav className={styles.nav}>
			{/* <nav className={styles.navLoading}> */}
			<p
				className={styles.nav_logo}
				style={{
					color: portal1active || portal2active || portal3active ? 'black' : 'white',
				}}
				onClick={(e) => {
					goToHome();
					router.push('/');
				}}
			>
				FREDERIC CARTIER
			</p>
			<div className={styles.nav_links}>
				<p
					className={`${styles.nav_link} ${aboutMeActiveState ? styles.active : ''}`}
					style={{
						color: portal1active || portal2active || portal3active ? 'black' : 'white',
					}}
					onClick={(e) => {
						router.push('/');
						clickHandler(e);
					}}
				>
					About Me
				</p>
				<p
					className={`${styles.nav_link} ${portalsActiveState ? styles.active : ''}`}
					style={{
						color: portal1active || portal2active || portal3active ? 'black' : 'white',
					}}
					onClick={(e) => {
						clickHandler(e);
						router.push('/');
					}}
				>
					Coming Soon
				</p>
			</div>
		</nav>
	);
}
