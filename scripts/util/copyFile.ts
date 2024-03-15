import fs from 'fs';
import chalk from 'chalk';
import { log } from 'console';
export default async function copyFile(source: string, target: string) {
	console.log(chalk.blue(`Copying ${source}`));

	try {
		log(chalk.blue(`Copying ${source}`));
		return await fs.copyFileSync(source, target);
	} catch (error) {
		console.log(chalk.red(`Error copying ${source} to ${target}`));
	}
}
