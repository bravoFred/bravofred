import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
import UserContextProvider from '@/store/userContext';
import InputContextProvider from '@/store/inputContext';
import { useContext, useEffect } from 'react';
export default function ScrollNavButtons() {
	const { theme } = useContext(UserContextProvider);
	const { prevSection, nextSection, portalsActive, aboutMeActive } =
		useContext(InputContextProvider);
	useEffect(() => {}, [portalsActive, aboutMeActive]);
	return (
		<div className={styles.scroll_nav}>
			<Image
				src={leftIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={prevSection}
			/>
			{/* <p
				style={{
					color: theme === 'light' ? 'black' : 'white',
					// fontWeight: '100',
				}}
			>
				{aboutMeActive.current ? 'About Me' : 'Coming Soon'}
			</p> */}
			<Image
				src={rightIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={nextSection}
			/>
		</div>
	);
}
