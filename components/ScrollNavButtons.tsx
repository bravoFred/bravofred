import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
import UserContextProvider from '@/store/userContext';
import InputContextProvider from '@/store/inputContext';
import { useContext, useEffect, useState } from 'react';
import { scale } from 'maath/dist/declarations/src/vector2';
import { useRouter } from 'next/router';

export default function ScrollNavButtons() {
	const { theme } = useContext(UserContextProvider);
	const {
		portalsActive,
		aboutMeActive,
		portal1active,
		portal2active,
		portal3active,
		gotoPortals,
		gotoAboutMe,
		goToHome,
	} = useContext(InputContextProvider);
	const router = useRouter();

	const clickHandler = (e) => {
		if (aboutMeActive) gotoPortals();
		if (portalsActive) gotoAboutMe();
		if (portal1active || portal2active || portal3active) {
			gotoPortals();
			router.push('/');
		}
	};
	const [showPrev, setShowPrev] = useState(false);
	const [showNext, setShowNext] = useState(true);
	useEffect(() => {
		aboutMeActive ? setShowNext(true) : setShowNext(false);
		portalsActive ? setShowPrev(true) : setShowPrev(false);
	}, [portalsActive, aboutMeActive, portal1active, portal2active, portal3active]);
	return (
		<div className={styles.scroll_nav}>
			<Image
				src={leftIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				onClick={clickHandler}
				style={{
					width: showPrev ? '30px' : '0',
					height: showPrev ? '30px' : '0',
					marginLeft: showPrev ? '0.5rem' : '0',
					marginRight: showPrev ? '0.5rem' : '0',

					filter:
						portal1active || portal2active || portal3active ? 'invert(100%)' : 'none',
				}}
			/>

			<Image
				src={rightIcon}
				alt="alt"
				className={styles.scroll_nav_icon}
				style={{
					width: showNext ? '30px' : '0',
					height: showNext ? '30px' : '0',
					marginLeft: showNext ? '0.5rem' : '0',
					// marginRight: showNext ? '0.5rem' : '0',

					filter:
						portal1active || portal2active || portal3active ? 'invert(100%)' : 'none',
				}}
				// onClick={nextSection}
				onClick={clickHandler}
			/>
		</div>
	);
}
