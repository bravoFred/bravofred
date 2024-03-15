import fs from 'fs';
import chalk from 'chalk';
import { log } from 'console';

export default function getSourceGLBFiles() {
	const files = fs.readdirSync('./public/models/src');
	let glbFiles = files.filter((file) => file.includes('.glb'));
	glbFiles.forEach((file) => {
		log(chalk.blue(`Removing ${file}`));
		fs.unlinkSync(`./public/models/src/${file}`);
	});
}
