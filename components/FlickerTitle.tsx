import styles from './FlickerTitle.module.scss';
type FlickerTitleProps = {
	title: string;
	theme?: 'light' | 'dark';
};
export default function FlickerTitle({ title, theme }: FlickerTitleProps) {
	return (
		<>
			<p
				className={styles.title}
				style={{
					color: theme === 'light' ? '#000' : '#fff',
				}}
			>
				{title}
			</p>
		</>
	);
}
