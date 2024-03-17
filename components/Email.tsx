import Image from 'next/image';
import icon from '../public/email.svg';
import styles from './Email.module.scss';
export default function EmailMe() {
	const email = 'cartierfrederic1@gmail.com';
	const url = `mailto:${email}`;

	const clickHandler = () => {
		window.open(url, '_blank').focus();
	};
	return (
		<div className={styles.email} onClick={clickHandler}>
			<Image src={icon} alt="email" width={50} height={50} className={styles.email_icon} />
		</div>
	);
}
