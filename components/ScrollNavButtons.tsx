import Image from 'next/image';
import styles from './ScrollNavButtons.module.scss';
import leftIcon from '@/public/icons/left.png';
import rightIcon from '@/public/icons/right.png';
export default function ScrollNavButtons() {
	return (
		<div className={styles.scroll_nav}>
			<Image src={leftIcon} alt="alt" className={styles.scroll_nav_icon} />
			<Image src={rightIcon} alt="alt" className={styles.scroll_nav_icon} />
		</div>
	);
}
