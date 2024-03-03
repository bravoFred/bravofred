import chalk from 'chalk';

export default function getStats(totalOriginalGLBSIze: number, totalCompressedGLBSize: number) {
	const howMuchFaster = totalOriginalGLBSIze / totalCompressedGLBSize;
	const totalReductionPercent = (1 - totalCompressedGLBSize / totalOriginalGLBSIze) * 100;

	console.log(
		`compressed` +
			chalk.red(` ${totalOriginalGLBSIze.toFixed(1)}MB`) +
			` to ` +
			chalk.green(`${totalCompressedGLBSize.toFixed(1)}MB`) +
			`: ` +
			chalk.green(`${totalReductionPercent.toFixed(1)}%`) +
			` size reduction for ` +
			chalk.bgGreenBright(`${howMuchFaster.toFixed(0)}x faster load times`)
	);
}
