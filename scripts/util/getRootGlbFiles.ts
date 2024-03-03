import fs from 'fs';
import chalk from 'chalk';

export default function getRootGlbFiles() {
	const files = fs.readdirSync('./');
	return files.filter((file) => file.includes('.glb'));
	// // exclude transformed files
	// const transformedFiles = glbFiles.filter((file) => file.includes('transformed'));
	// // remove transformed files from glbFiles
	// transformedFiles.forEach((file) => {
	// 	const index = glbFiles.indexOf(file);
	// 	glbFiles.splice(index, 1);
	// });
	// return glbFiles;
}
