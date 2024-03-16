/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/models/src/iconIG.glb --output models/4096/IconIG.tsx -r public/models4096 --transform -t --resolution 4096 --keepmaterials -m --keepmeshes --keepnames -s 
Files: ./public/models/src/iconIG.glb [8.06MB] > C:\Users\Tommy\Documents\GitHub\frederic-cartier\models\4096\models/4096/iconIG-transformed.glb [239.19KB] (97%)
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		Cube016: THREE.Mesh;
		Cube016_1: THREE.Mesh;
	};
	materials: {
		white: THREE.MeshStandardMaterial;
	};
	animations: GLTFAction[];
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/../../models/4096/iconIG-transformed.glb') as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group name="icon001" userData={{ name: 'icon.001' }}>
				<mesh
					name="Cube016"
					castShadow
					receiveShadow
					geometry={nodes.Cube016.geometry}
					material={materials.white}
				/>
				<mesh
					name="Cube016_1"
					castShadow
					receiveShadow
					geometry={nodes.Cube016_1.geometry}
					material={materials.white}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/../../models/4096/iconIG-transformed.glb');
