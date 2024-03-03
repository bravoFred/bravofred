/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
// https://www.npmjs.com/package/gltfjsx

import fs from 'fs';
import getSourceGLBFiles from '../util/getSourceGLBFiles';
import getTransformedGLBFiles from '../util/getTransformedGLBFiles';
import copyFile from '../util/copyFile';
import removeFile from '../util/removeFile';
import chalk from 'chalk';
const { exec } = require('child_process');

const sourceFolder = `./public`;
const sourceGLBFiles = getSourceGLBFiles(sourceFolder);
const transformedGLBFiles = getTransformedGLBFiles(sourceFolder);
const transformedFolder = `./public`;
const ignoreStrings = ['Logo', 'Fans', 'Drone', 'drone'];
// npx gltfjsx public/Kitchen -t -s
(async function convertFiles() {
	// remove transformed files
	transformedGLBFiles.forEach((file) => {
		const filePath = `${sourceFolder}/${file}`;
		// removeFile(filePath);
	});
	sourceGLBFiles.forEach((file) => {
		const fileExtension = file.split('.')[1];
		const fileName = `${file.split('.')[0]}`;
		const fileNameWithExtension = `${file.split('.')[0]}.${fileExtension}`;
		const targetFile = `${sourceFolder}/${fileNameWithExtension}`;
		console.log(targetFile);

		const convertGLBToTypeScriptCommand = `npx gltfjsx ${targetFile} -t `;
		// check if file name to lowercase is in ignore list
		if (ignoreStrings.some((v) => fileName.includes(v))) {
			console.log(chalk.bgRed(`Skipping ${fileNameWithExtension}`));
			return;
		} else {
			// convert glb to tsx
			exec(convertGLBToTypeScriptCommand, (err: any, stdout: any, stderr: any) => {
				const fileNameCapitalized =
					fileNameWithExtension.charAt(0).toUpperCase() + fileNameWithExtension.slice(1);
				const tsxExtension = '.tsx';
				const newTsxPath = `${fileNameCapitalized.split('.')[0]}${tsxExtension}`;

				const newTsxTargetPath = `components/${fileNameCapitalized.split('.')[0]}HD.tsx`;

				copyFile(newTsxPath, newTsxTargetPath);
				removeFile(newTsxPath);
				if (err) {
					console.log(chalk.bgRed(`Error converting glb to tsx`));
					return;
				}
			});
		}
	});
})();
