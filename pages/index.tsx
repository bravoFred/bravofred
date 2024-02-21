import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/App.module.css';
import Header from '@/components/Header';
import FlickerTitle from '@/components/FlickerTitle';
const inter = Inter({ subsets: ['latin'] });
import Main from '@/components/Main';

export default function Home() {
	return (
		<>
			<Header />
			<Main />
		</>
	);
}
