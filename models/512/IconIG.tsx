/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/models/src/iconIG.glb --output models/512/IconIG.tsx -r public/models512 --transform -t --resolution 512 --keepmaterials -m --keepmeshes --keepnames -s 
Files: ./public/models/src/iconIG.glb [15.58MB] > C:\Users\Tommy\Documents\GitHub\frederic-cartier\models\512\models/512/iconIG-transformed.glb [73.77KB] (100%)
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		icon: THREE.Mesh;
		ringInner: THREE.Mesh;
		outerRing: THREE.Mesh;
	};
	materials: {
		metal: THREE.MeshStandardMaterial;
	};
	// animations: GLTFAction[]
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>;

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF(
		'/../../models/512/models/512/iconIG-transformed.glb'
	) as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<pointLight
				name="Point"
				intensity={5435.141}
				decay={2}
				position={[0.099, 0.999, 0.332]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={0.199}
				userData={{ name: 'Point' }}
			/>
			<mesh
				name="icon"
				castShadow
				receiveShadow
				geometry={nodes.icon.geometry}
				material={materials.metal}
				userData={{ name: 'icon' }}
			/>
			<mesh
				name="ringInner"
				castShadow
				receiveShadow
				geometry={nodes.ringInner.geometry}
				material={materials.metal}
				userData={{ name: 'ringInner' }}
			/>
			<mesh
				name="outerRing"
				castShadow
				receiveShadow
				geometry={nodes.outerRing.geometry}
				material={materials.metal}
				userData={{ name: 'outerRing' }}
			/>
		</group>
	);
}

useGLTF.preload('/../../models/512/models/512/iconIG-transformed.glb');
