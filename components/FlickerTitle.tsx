import styles from './FlickerTitle.module.scss';
type FlickerTitleProps = {
	title: string;
};
export default function FlickerTitle({ title }: FlickerTitleProps) {
	return (
		<>
			<p className={styles.title}>{title}</p>
		</>
	);
}
