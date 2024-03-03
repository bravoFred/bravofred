import fs from 'fs';
import chalk from 'chalk';

export default function getSourceGLBFiles(sourceFolder) {
	const files = fs.readdirSync(sourceFolder);
	let glbFiles = files.filter((file) => file.includes('.glb'));
	// exclude transformed files
	const transformedFiles = glbFiles.filter((file) => file.includes('transformed'));
	// remove transformed files from glbFiles
	transformedFiles.forEach((file) => {
		const index = glbFiles.indexOf(file);
		glbFiles.splice(index, 1);
	});
	return glbFiles;
}
