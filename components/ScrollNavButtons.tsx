import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
import UserContextProvider from '@/store/userContext';
import InputContextProvider from '@/store/inputContext';
import { useContext, useEffect } from 'react';
import { scale } from 'maath/dist/declarations/src/vector2';
export default function ScrollNavButtons() {
	const { theme } = useContext(UserContextProvider);
	const {
		prevSection,
		nextSection,
		portalsActive,
		aboutMeActive,
		portal1active,
		portal2active,
		portal3active,
		gotoPortals,
	} = useContext(InputContextProvider);
	const clickHandler = (e) => {
		prevSection();
	};
	return (
		<div className={styles.scroll_nav}>
			<Image
				src={leftIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={clickHandler}
				style={{
					width: portal1active || portal2active || portal3active ? '0' : '30px',
					height: portal1active || portal2active || portal3active ? '0' : '30px',
					filter:
						portal1active || portal2active || portal3active ? 'invert(100%)' : 'none',
				}}
			/>

			<Image
				src={rightIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				style={{
					width: portal1active || portal2active || portal3active ? '0' : '30px',
					height: portal1active || portal2active || portal3active ? '0' : '30px',
					filter:
						portal1active || portal2active || portal3active ? 'invert(100%)' : 'none',
				}}
				onClick={nextSection}
			/>
		</div>
	);
}
