import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
	useCursor,
	MeshPortalMaterial,
	CameraControls,
	Gltf,
	Text,
	CameraShake,
} from '@react-three/drei';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';

import { MathUtils } from 'three';

extend(geometry);
import dynamic from 'next/dynamic';
import PortalsOne from './PortalsOne';
// import PortalsTwo from './PortalsTwo';

export default function PortalsCards() {
	const { mobile } = useContext(UserContextProvider);
	const { aboutMeActive } = useContext(InputContextProvider);
	const pexel = (id) =>
		`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
	const portals = [
		// Front
		// {
		// 	position: [0, 0, 1.5],
		// 	rotation: [0, 0, 0],
		// 	url: 'https://images.pexels.com/photos/20440355/pexels-photo-20440355/free-photo-of-a-photo-of-waves-crashing-into-the-ocean.jpeg',
		// },
		// original except custom
		// Back
		// { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
		// { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
		// Left
		// { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
		// { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
		// { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
		// Right
		// { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
		// { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
		// { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) },
		// custom
		// left
		{ position: [-1.15, 0, 0], rotation: [0, 0.5, 0], url: pexel(416430) },
		// center
		{ position: [0, 0, 0], rotation: [0, 0, 0], url: pexel(310452) },
		// right
		{ position: [1.15, 0, 0], rotation: [0, -0.5, 0], url: pexel(310452) },
	];
	return (
		<>
			<PortalsOne />
			{/* <PortalsTwo portals={portals} /> */}
		</>
	);
}
