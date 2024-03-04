import styles from './Nav.module.scss';
import { useProgress } from '@react-three/drei';
import { useRef, useEffect, useState, use } from 'react';
export default function Nav() {
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
		<nav className={!done ? styles.navLoading : styles.navLoaded}>
			{/* <nav className={styles.navLoading}> */}
			<p className={!done ? styles.nav_text_loading : styles.nav_text_loaded}>FREDERIC </p>
		</nav>
	);
}
