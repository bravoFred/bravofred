import styles from './Tip.module.scss';
export default function Tip() {
	const message = 'Scroll down to move to Coming Soon';
	return <p className={styles.tip}>{message}</p>;
}
