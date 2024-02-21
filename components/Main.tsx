import styles from '@/styles/App.module.css';
import FlickerTitle from '@/components/FlickerTitle';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Main() {
	return (
		<main className={`${styles.main} ${inter.className}`}>
			<h1>FREDERIC CARTIER</h1>
			<FlickerTitle title="coming soon" />
		</main>
	);
}
