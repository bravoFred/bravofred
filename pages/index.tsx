import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/App.module.css';
import Header from '@/components/Header';
import FlickerTitle from '@/components/FlickerTitle';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Header />
			<main className={`${styles.main} ${inter.className}`}>
				<h1>FREDERIC CARTIER</h1>
				<FlickerTitle title="coming soon" />
			</main>
		</>
	);
}
