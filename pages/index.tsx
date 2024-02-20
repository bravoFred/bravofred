import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Header />
			<main className={`${styles.main} ${inter.className}`}>
				<h1>FREDERIC CARTIER PORTFOLIO</h1>
				<p>COMING SOON</p>
			</main>
		</>
	);
}
