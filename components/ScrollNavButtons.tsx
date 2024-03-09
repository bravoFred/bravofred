import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
import UserContextProvider from '@/store/userContext';
import { useContext } from 'react';
interface Props {
	prev: () => void;
	next: () => void;
}
export default function ScrollNavButtons(props: Props) {
	const { prev, next } = props;
	return (
		<div className={styles.scroll_nav}>
			<Image src={leftIcon} alt="alt" className={styles.scroll_nav_icon} onClick={prev} />
			<Image src={rightIcon} alt="alt" className={styles.scroll_nav_icon} onClick={next} />
		</div>
	);
}
