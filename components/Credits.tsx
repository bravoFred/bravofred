import styles from './Credits.module.scss';
import Link from 'next/link';
import InputContextProvider from '@/store/inputContext';
import { useContext } from 'react';
export default function Credits() {
	const designer = ` Frederic Cartier`;
	const developer = `Thomas Matlock`;
	const { aboutMeActive } = useContext(InputContextProvider);
	const currentYear = new Date().getFullYear();
	return (
		<div className={styles.credits} style={aboutMeActive ? { opacity: '1' } : { opacity: '0' }}>
			<div className={styles.credit}>
				<p className={styles.credit_text}>
					&copy; {designer} {currentYear}. All rights reserved.
				</p>
			</div>
			<div className={styles.credit}>
				<div className={styles.credit_item}>
					<p className={styles.credit_text}>Design</p>
					<p className={styles.credit_text_bold}>{designer}</p>
				</div>
				<div className={styles.credit_item}>
					<p className={styles.credit_text}>Development</p>
					<Link href="https://www.thomasmatlock.com" target="_blank">
						<p className={styles.credit_text_bold} style={{ cursor: 'pointer' }}>
							{developer}
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
