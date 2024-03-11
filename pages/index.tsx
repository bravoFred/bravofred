import Script from 'next/script';
import styles from '@/styles/App.module.css';
import Header from '@/components/Header';
import { UserContextProvider } from '../store/userContext';
import { InputContextProvider } from '../store/inputContext';

import Main from '@/components/Main';

export default function Home() {
	return (
		<UserContextProvider>
			<InputContextProvider>
				<div className={styles.app}>
					<Script async src="https://www.googletagmanager.com/gtag/js?id=G-Y69LRR1D22" />
					<Script id="google-analytics">
						{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-Y69LRR1D22');`}
					</Script>
					<Header />
					<Main />
				</div>
			</InputContextProvider>
		</UserContextProvider>
	);
}
