import styles from './Status.module.scss';
export default function Status() {
	return (
		<div className={styles.status}>
			<p className={styles.status_text}>Location</p>
			<p className={styles.status_text}>Time</p>
		</div>
	);
}
