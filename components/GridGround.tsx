import { Grid } from '@react-three/drei';
type Props = {
	theme: string;
};
export default function Ground(props: Props) {
	const { theme } = props;
	// console.log(theme);

	const gridConfig = {
		cellSize: 0.5, // small squares size
		cellThickness: 0.5, // small squares line thickness
		sectionSize: 2.5, // size of the large squares,
		sectionThickness: 1, // line thickness of large squares
		// fadeDistance: 100,
		fadeDistance: 50,
		fadeStrength: 2,
		followCamera: false,
		infiniteGrid: true,
		receiveShadow: true, // default
	};
	return (
		<Grid
			receiveShadow
			position={[0, 0, 0]}
			args={[10.5, 10.5]}
			{...gridConfig}
			sectionColor={theme === 'dark' ? '#fff' : '#1a1a1a'}
			cellColor={theme === 'dark' ? '#fff' : '#1a1a1a'}
		/>
	);
}
