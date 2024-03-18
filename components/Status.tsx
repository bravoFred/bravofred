'use client';
import styles from './Status.module.scss';
import { useEffect, useState } from 'react';
import { getCurrentHour, getCurrentMinute, getAmPm, getWeekDay, getCurrentSecond } from './Time';

export default function Status() {
	const [userTime, setUserTime] = useState(``);
	function updateTimeString() {
		setUserTime(
			`${getWeekDay()}, ${getCurrentHour()}:${getCurrentMinute()}:${getCurrentSecond()} ${getAmPm()}`
		);
	}
	useEffect(() => {
		updateTimeString();
		const interval = setInterval(() => {
			updateTimeString();
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<div className={styles.status}>
			<p className={styles.status_text}>Atlanta, GA</p>
			<p className={styles.status_text}>{userTime}</p>
		</div>
	);
}
