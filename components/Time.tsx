export function getCurrentHour() {
	let hour = new Date().getHours();
	if (hour === 0) hour = 12;
	else if (hour > 12) hour -= 12;
	// change to midnight
	if (hour === 0) return 'midnight';
	// change to noon
	// if (hour === 12) return 'noon';
	// change to 1-9

	return hour.toString();
}
export function getUserTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
export function getCurrentMinute() {
	let minutes = new Date().getMinutes().toString();
	if (minutes === '00') return `o'clock`;
	if (minutes.length === 1) minutes = `0${minutes}`;

	return minutes;
}
export function getCurrentSecond() {
	return new Date().getSeconds().toString().padStart(2, '0');
}

export function getAmPm() {
	const userTime = new Date();
	const hour = new Date(userTime).getHours();
	return hour >= 12 ? 'pm' : 'am';
}

export function getPhaseOfDay() {
	const userTime = new Date();
	const hour = new Date(userTime).getHours();
	let phase = '';
	if (hour >= 0 && hour < 6) {
		phase = 'night';
	} else if (hour >= 6 && hour < 12) {
		phase = 'morning';
	} else if (hour >= 12 && hour < 18) {
		phase = 'afternoon';
	} else if (hour >= 18 && hour < 24) {
		phase = 'evening';
	}
	return phase;
}
export function getEarlyMiddleLate() {
	let phase = getPhaseOfDay();
	let hour = new Date().getHours();
	let earlyMiddleLate = '';
	if (phase === 'morning') {
		earlyMiddleLate = hour < 10 ? 'early' : hour < 12 ? 'mid' : 'late';
	} else if (phase === 'afternoon') {
		earlyMiddleLate = hour < 14 ? 'early' : hour < 16 ? 'mid' : 'late';
	} else if (phase === 'evening') {
		earlyMiddleLate = hour < 18 ? 'early' : hour < 20 ? 'mid' : 'late';
	} else if (phase === 'night') {
		earlyMiddleLate = hour < 20 ? 'early' : hour < 22 ? 'mid' : 'late';
	}
	return earlyMiddleLate;
}

export function getWeekDay() {
	return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}
export function getDayOfMonth() {
	return new Date().toLocaleDateString('en-US', { day: 'numeric' });
}
export function getDayOfMonthSuffix() {
	const day = new Date().getDate();
	if (day >= 11 && day <= 13) {
		return 'th';
	}
	switch (day % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}
export function getMonth() {
	return new Date().toLocaleDateString('en-US', { month: 'short' });
}
export function getYear() {
	return new Date().toLocaleDateString('en-US', { year: 'numeric' });
}
export function updateTimeStatus() {
	return `${getWeekDay()} ${getPhaseOfDay()}, ${getMonth()} ${getDayOfMonth()}${getDayOfMonthSuffix()}, ${getCurrentHour()}:${getCurrentMinute()} ${getAmPm()}`;
}
