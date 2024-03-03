import fs from 'fs';
import chalk from 'chalk';

export default function getTransformedGLBFiles(sourceFolder) {
	const files = fs.readdirSync(sourceFolder);
	let glbFiles = files.filter((file) => file.includes('.glb'));
	glbFiles = glbFiles.filter((file) => file.includes('-transformed'));
	// console.log(chalk(`Found ${glbFiles.length} transformed glb files`));

	return glbFiles;
}
