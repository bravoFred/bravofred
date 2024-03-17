/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/models/src/iconYT.glb --output models/4096/IconYT.tsx -r public/models4096 --transform -t --resolution 4096 --keepmaterials -m --keepmeshes --keepnames -s 
Files: ./public/models/src/iconYT.glb [3.86MB] > C:\Users\Tommy\Documents\GitHub\frederic-cartier\models\4096\models/4096/iconYT-transformed.glb [143.4KB] (96%)
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		youtube002: THREE.Mesh;
		youtube002_1: THREE.Mesh;
	};
	materials: {
		ytWhite: THREE.MeshStandardMaterial;
	};
	// animations: GLTFAction[]
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/../../models/4096/iconYT-transformed.glb') as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group name="youtube001" userData={{ name: 'youtube.001' }}>
				<mesh
					name="youtube002"
					castShadow
					receiveShadow
					geometry={nodes.youtube002.geometry}
					material={materials.ytWhite}
				/>
				<mesh
					name="youtube002_1"
					castShadow
					receiveShadow
					geometry={nodes.youtube002_1.geometry}
					material={materials.ytWhite}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/../../models/4096/iconYT-transformed.glb');
