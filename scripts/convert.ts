/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import fs from 'fs';
import getSourceGLBFiles from './util/getSourceGLBFiles';
import copyFile from './util/copyFile';
import { getFileSizeMB } from './util/getFileSize';
import getStats from './util/getStats';
import chalk from 'chalk';
const { exec } = require('child_process');
import {
	importUseFrame,
	replaceGlbPath,
	checkIfAnimations,
	replaceAnimationsInterface,
	replaceUseAnimationsStr,
	insertAnimationsType,
	getAnimationNames,
	addAnimations,
} from './util/AnimationFunctions';

let totalOriginalGLBSIze = 0;
let totalCompressedGLBSize = 0;
(async function convert() {
	const srcGlbFolder = `./public/models/src`;
	const srcGlbFiles = getSourceGLBFiles(srcGlbFolder);
	// const resolutions = [512, 1024, 2048, 4096];
	const resolutions = [4096];
	srcGlbFiles.forEach((file) => {
		const srcGlbName = `${file.split('.')[0]}`;
		const srcGlbExtension = file.split('.')[1];
		const srcGlbNameWithExtension = `${file.split('.')[0]}.${srcGlbExtension}`;
		const srcGlbTargetFile = `${srcGlbFolder}/${srcGlbNameWithExtension}`;

		const totalOriginalGLBSIzeMB = getFileSizeMB(srcGlbTargetFile);
		totalOriginalGLBSIze += totalOriginalGLBSIzeMB;
		resolutions.forEach((res) => {
			// create new folder for each resolution for glb files
			if (!fs.existsSync(`./public/models/${res.toString()}`)) {
				fs.mkdirSync(`./public/models/${res.toString()}`);
			}
			// create new folder for each resolution for tsx files
			if (!fs.existsSync(`./models/${res.toString()}`)) {
				fs.mkdirSync(`./models/${res.toString()}`);
			}
			const newGlbTargetFolder = `./public/models/${res.toString()}`;
			const tsxFileCapitalized =
				srcGlbNameWithExtension.charAt(0).toUpperCase() + srcGlbNameWithExtension.slice(1);
			const newTsxTargetPath = `models/${res.toString()}/${
				tsxFileCapitalized.split('.')[0]
			}.tsx`;
			const convertGLBToTypeScriptCommand = `npx gltfjsx ${srcGlbTargetFile} --output ${newTsxTargetPath} -r public/models${res} --transform -t --resolution ${res} --keepmaterials -m  --keepmeshes --keepnames -s`;

			exec(convertGLBToTypeScriptCommand, (err: any, stdout: any, stderr: any) => {
				const newGlbPath = `${srcGlbName}-transformed.glb`; // new glb file path
				const newModelPath = `models/${res}/${newGlbPath}`;

				let newTsxFileContents = replaceGlbPath(srcGlbName, newModelPath, newTsxTargetPath);
				const hasAnimations = checkIfAnimations(newTsxFileContents); // check if glb has animations
				let animations = []; // animations array
				newTsxFileContents = importUseFrame(newTsxFileContents); // import useFrame
				newTsxFileContents = replaceUseAnimationsStr(newTsxFileContents);
				if (hasAnimations) {
					animations = getAnimationNames(newTsxFileContents);
					newTsxFileContents = insertAnimationsType(newTsxFileContents);
					newTsxFileContents = replaceAnimationsInterface(newTsxFileContents);
					newTsxFileContents = replaceUseAnimationsStr(newTsxFileContents);
					animations = getAnimationNames(newTsxFileContents);
					newTsxFileContents = addAnimations(newTsxFileContents, animations);
				}
				fs.writeFileSync(newTsxTargetPath, newTsxFileContents, 'utf8'); // replaces generated tsx file with updated tsx file contents
				const newGlbPathTargetPath = `${newGlbTargetFolder}/${newGlbPath}`; // new glb file in root
				const transformedFileSizeInMB = getFileSizeMB(newGlbPath); // new glb size in MB
				totalCompressedGLBSize += transformedFileSizeInMB; // add new glb size to total glb files compressed size
				getStats(totalOriginalGLBSIze, totalCompressedGLBSize); // get stats
				copyFile(newGlbPath, newGlbPathTargetPath); // copy new glb file to target glb folder
				if (err) {
					console.log(chalk.bgRed(`Error converting glb to tsx`));
					convert(); // restart conversion
				}
				return;
			});
		});
	});
})();
