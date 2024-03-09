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
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../../store/userContext';
import { MathUtils } from 'three';

extend(geometry);
import dynamic from 'next/dynamic';
import PortalsOne from './PortalsOne';
import PortalsTwo from './PortalsTwo';

interface Props {
	active: boolean;
}
export default function PortalsCards(props: Props) {
	const { active } = props;

	return (
		<>
			<PortalsOne active={active} />
			{/* <PortalsTwo /> */}
		</>
	);
}
