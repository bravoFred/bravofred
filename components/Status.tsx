'use client';
import styles from './Status.module.scss';
import { useState } from 'react';
export default function Status() {
	// get current time
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const [time, setTime] = useState({
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	});
	// get am or pm
	const amPm = hours >= 12 ? 'pm' : 'am';
	// update time every second
	setTimeout(() => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		setTime({
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		});
	}, 1000);
	// day of the week
	const day = date.getDay();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayOfWeek = days[day];

	return (
		<div className={styles.status}>
			<p className={styles.status_text}>Atlanta, Georgia</p>
			<p className={styles.status_text}>
				{dayOfWeek}, {hours > 12 ? hours - 12 : hours}:{time.minutes}:
				{time.seconds < 10 ? '0' + time.seconds : time.seconds} {amPm}
			</p>
		</div>
	);
}
