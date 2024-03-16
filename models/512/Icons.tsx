/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/models/src/icons.glb --output models/512/Icons.tsx -r public/models512 --transform -t --resolution 512 --keepmaterials -m --keepmeshes --keepnames -s 
Files: ./public/models/src/icons.glb [35.67MB] > C:\Users\Tommy\Documents\GitHub\frederic-cartier\models\512\models/512/icons-transformed.glb [335.91KB] (99%)
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		Cube001: THREE.Mesh;
	};
	materials: {
		metal: THREE.MeshStandardMaterial;
	};
	// animations: GLTFAction[]
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF(
		'/../../models/512/models/512/icons-transformed.glb'
	) as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<mesh
				name="Cube001"
				castShadow
				receiveShadow
				geometry={nodes.Cube001.geometry}
				material={materials.metal}
				position={[0, 0.33, 0]}
				userData={{ name: 'Cube.001' }}
			/>
		</group>
	);
}

useGLTF.preload('/../../models/512/models/512/icons-transformed.glb');
