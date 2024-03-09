import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
import UserContextProvider from '@/store/userContext';
import InputContextProvider from '@/store/inputContext';
import { useContext } from 'react';
export default function ScrollNavButtons() {
	const { prevSection, nextSection } = useContext(InputContextProvider);
	return (
		<div className={styles.scroll_nav}>
			<Image
				src={leftIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={prevSection}
			/>
			<Image
				src={rightIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={nextSection}
			/>
		</div>
	);
}
