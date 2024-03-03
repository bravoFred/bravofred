import fs from 'fs';
export function replaceGlbPath(glbFileName, newModelPath, newTsxOriginPath) {
	const transformedModelStr = `${glbFileName}-transformed.glb`; // new glb file path
	const tsxFileContents = fs.readFileSync(newTsxOriginPath, 'utf8'); // read contents of new tsx file
	const modelPathRegex = new RegExp(transformedModelStr, 'g'); // find
	return tsxFileContents.replace(modelPathRegex, newModelPath); // replace old model path with new model path
}
export function importUseFrame(tsxFileContents) {
	const useFrameStr = `import { GLTF } from 'three-stdlib'`; //  find an import statement
	const useFrameReplaceStr = `import { GLTF } from 'three-stdlib'; import { useFrame } from '@react-three/fiber';`; // replace with import statement and useFrame
	const useFrameRegex = new RegExp(useFrameStr, 'g');
	return tsxFileContents.replace(useFrameRegex, useFrameReplaceStr); // replace import statement with import statement and useFrame
}
export function checkIfAnimations(tsxFileContents) {
	// const str = `useAnimations<GLTFActions>`; // str to replace
	const str = `}

type ActionName `;
	const strExists = tsxFileContents.includes(str); // check if str exists
	return strExists;
}
export function replaceAnimationsInterface(tsxFileContents) {
	const actionNameStr = `type ActionName =`; // str to find
	const actionNameRegex = new RegExp(actionNameStr, 'g'); // regex to find str
	const actionNameExists = actionNameRegex.test(tsxFileContents); // check if str exists
	if (actionNameExists) {
		const interfaceStr = `export function`;
		const interFaceReplaceStr = `interface GLTFAction extends THREE.AnimationClip {
	name: ActionName;
}
export  function`;
		const interfaceRegex = new RegExp(interfaceStr, 'g');
		return tsxFileContents.replace(interfaceRegex, interFaceReplaceStr);
	} else {
		return tsxFileContents;
	}
}
export function replaceUseAnimationsStr(tsxFileContents) {
	const str = `useAnimations<GLTFActions>`; // str to replace
	const strExists = tsxFileContents.includes(str); // check if str exists
	if (!strExists) return tsxFileContents; // if str does not exist, return tsx file contents
	const newStr = `useAnimations`; // new str
	const regex = new RegExp(str, 'g'); // regex to find str
	return tsxFileContents.replace(regex, newStr); // replace str with new str
}
export function insertAnimationsType(tsxFileContents) {
	// check if 'type ActionName' exists
	const str = `}

type ActionName `;
	const actionNameRegex = new RegExp(str, 'g');
	const actionNameExists = actionNameRegex.test(tsxFileContents);
	if (!actionNameExists) return tsxFileContents; // if it exists, return tsx file contents
	const newStr = ` animations: GLTFAction[]; }

type ActionName `;
	const newRegex = new RegExp(str, 'g');
	return tsxFileContents.replace(newRegex, newStr);
}
export function addUseFrame(newTsxFileContents) {
	const str = `return`;
	const newStr = `useFrame((state) => {}); return`;
	const regex = new RegExp(str, 'g');
	return newTsxFileContents.replace(regex, newStr);
}
export function getAnimationNames(newTsxFileContents) {
	const animationNames = [];
	// all names after type ActionName ='
	const str = `type ActionName =`; // str to find
	const regex = new RegExp(str, 'g'); // regex to find str
	const startIndex = newTsxFileContents.search(regex) + str.length; // start index of animation names
	const endIndex = newTsxFileContents.indexOf('type GLTFActions', startIndex); // end index of animation names
	const animationNamesStr = newTsxFileContents.substring(startIndex, endIndex);
	const animationNamesArr = animationNamesStr.split('|');
	animationNamesArr.forEach((name) => {
		animationNames.push(name.trim());
	});
	return animationNames;
}
export function addAnimations(newTsxFileContents, animations) {
	const str = `return`; // search for return
	const animationStrings = []; // array of strings to insert into useFrame
	// create array of strings to insert into useFrame
	animations.forEach((animation) => {
		animationStrings.push(`actions[${animation}].time = state.clock.getElapsedTime();
		actions[${animation}].play();
		actions[${animation}].play().paused = false;`);
	});
	// create useFrame with all animations inserted
	const newStr = `useFrame((state) => {
		${animationStrings}
	}); return`;
	// remove commas from newStr
	const commaRegex = new RegExp(',', 'g');
	const newStrNoCommas = newStr.replace(commaRegex, '');
	const regex = new RegExp(str, 'g');
	return newTsxFileContents.replace(regex, newStrNoCommas);
}

module.exports = {
	importUseFrame,
	checkIfAnimations,
	replaceGlbPath,
	replaceAnimationsInterface,
	replaceUseAnimationsStr,
	insertAnimationsType,
	getAnimationNames,
	// addUseFrame,
	addAnimations,
};
