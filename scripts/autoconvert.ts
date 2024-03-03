import chalk from 'chalk';
const chokidar = require('chokidar');
// import { log } from 'console';
const log = console.log.bind(console);
const { exec } = require('child_process');
import getRootGlbFiles from './util/getRootGlbFiles';
import removeSrcGlbFiles from './util/removeSrcGlbFiles';
import removeFile from './util/removeFile';

function compress() {
	log(chalk.yellow('compressing...'));
	exec('npm run convert', (err: any, stdout: any, stderr: any) => {
		if (err) {
			console.log(chalk.red('Error compressing'));
			return;
		}
		log(chalk.bgGreen('New models compressed'));
		const newGlbFiles = getRootGlbFiles();
		newGlbFiles.forEach((file: string) => removeFile(file));
		// removeSrcGlbFiles();
	});
}
const watcher = chokidar.watch('public/models/src', {
	persistent: true,
});
let initialRunComplete = false;
setTimeout(() => {
	initialRunComplete = true;
}, 3000);
watcher
	.on('add', (path) => {
		if (initialRunComplete) compress();
	})
	.on('change', (path) => compress())
	.on('unlink', (path) => {});
console.log(chalk.green('Watching source folder for changes...'));
