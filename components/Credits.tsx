import styles from './Credits.module.scss';
import Link from 'next/link';
export default function Credits() {
	const designer = `Frederic Cartier`;
	const developer = `Thomas Matlock`;
	const currentYear = new Date().getFullYear();
	return (
		<div className={styles.credits}>
			<div className={styles.credit}>
				<p className={styles.credit_text}>
					&copy; {designer} {currentYear}. All rights reserved.
				</p>
			</div>
			<div className={styles.credit}>
				<p className={styles.credit_text}>Designed by</p>
				<p className={styles.credit_text_bold}>{designer}</p>{' '}
				<p className={styles.credit_text}>Developed by</p>
				<Link href="https://www.thomasmatlock.com" target="_blank">
					<p className={styles.credit_text_bold} style={{ cursor: 'pointer' }}>
						{developer}
					</p>
				</Link>
			</div>
			{/* <p className={styles.credit_text}>Designed by</p>
			<p className={styles.credit_person}>{designer}</p>
			<p className={styles.credit_text}>DEVELOPED BY</p>
			<p className={styles.credit_person}>{developer}</p> */}
		</div>
	);
}
