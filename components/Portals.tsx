import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../store/userContext';

extend(geometry);
import dynamic from 'next/dynamic';
import VideoText from './VideoText';

const Scene = dynamic(() => import('./Kitchen').then((mod) => mod.Model), {
	ssr: false,
});
function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
	const portal = useRef();
	const [, setLocation] = useLocation();
	const [, params] = useRoute<{ id: string }>('/item/:id');
	const [hovered, hover] = useState(false);
	useCursor(hovered);
	useFrame((state, dt) =>
		easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
	);
	const [text, setText] = useState(`FREDERIC${'\n'}CARTIER`);

	return (
		<group {...props} position={[0, 1, 0]}>
			<Text
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.2}
				{...props}
				anchorY="top"
				anchorX="left"
				lineHeight={0.8}
				position={[-0.375, 0.715, 0.01]}
				material-toneMapped={false}
			>
				{name}
			</Text>
			<Text
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.1}
				anchorX="right"
				position={[0.4, -0.659, 0.01]}
				material-toneMapped={false}
			>
				{id}
			</Text>
			<Text
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.04}
				anchorX="right"
				position={[0.0, -0.677, 0.01]}
				material-toneMapped={false}
			>
				{author}
			</Text>
			<mesh
				name={id}
				onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))}
				onPointerOver={(e) => hover(true)}
				onPointerOut={() => hover(false)}
			>
				{/* <roundedPlaneGeometry args={[width, height, 0.1]} /> */}
				<boxGeometry args={[width, height, 0.01]} />
				{/* <planeGeometry args={[width, height, 0.1]} /> */}
				<MeshPortalMaterial
					ref={portal}
					events={params?.id === id}
					side={THREE.DoubleSide}
					// blend={0}
				>
					<color attach="background" args={[bg]} />
					{children}
				</MeshPortalMaterial>
			</mesh>
		</group>
	);
}

// function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
function Rig({ position = new THREE.Vector3(0, 1, 5), focus = new THREE.Vector3(0, 1, 0) }) {
	const { controls, scene } = useThree<{
		controls: CameraControls;
		scene: THREE.Scene;
	}>();
	const [, params] = useRoute<{ id: string }>('/item/:id');
	useEffect(() => {
		const active = scene.getObjectByName(params?.id);
		if (active) {
			active.parent.localToWorld(position.set(0, 0.5, 0.25));
			active.parent.localToWorld(focus.set(0, 0, -2));
		}
		controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
	});
	return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}
export default function PortalsCards() {
	const [portalsInactiveVector, setPortalsInactiveVector] = useState(
		new THREE.Vector3(0, 0, -25)
	);
	const { mobile } = useContext(UserContextProvider);
	const [portalsFocusedVector, setPortalsFocusedVector] = useState(
		new THREE.Vector3(0, 0, mobile ? 0 : 0)
	);
	const scroll = useScroll();
	const portalsRef = useRef<THREE.Group>();
	const portal1Ref = useRef<THREE.Group>();
	const portal2Ref = useRef<THREE.Group>();
	const portal3Ref = useRef<THREE.Group>();
	useFrame((state) => {
		const offset = 1 - scroll.offset;
		// console.log(scroll.offset);
		// listen for positive or negative scroll direction

		state.camera.position.set(0, 1, 5);
		// state.camera.position.set(
		// 	Math.sin(offset) * -20, // this makes the camera move in a circle
		// 	Math.atan(offset * Math.PI * 2) * 1, // this makes the camera move up and down
		// 	Math.cos((offset * Math.PI) / 3) * 5 // this makes the camera move closer and further away
		// );
		// state.camera.position.set(

		// );
		state.camera.lookAt(0, 1, 0);
		// move the portals group between the inactive and focused positions
		// portalsRef.current.position.lerpVectors(
		portalsRef.current.position.lerpVectors(
			portalsInactiveVector,
			portalsFocusedVector,
			scroll.offset
		);
	});

	return (
		<group ref={portalsRef} position={[0, 0, -50]}>
			<group position={[-1.15, 0, 0.25]} rotation={[0, 0.5, 0]} ref={portal1Ref}>
				<Frame id="01" name="Film 1" author="Frederic Cartier" bg="#1a1a1a">
					<Scene position={[0, -1, -1]} />
					<ambientLight intensity={2} />
				</Frame>
			</group>
			<group ref={portal2Ref}>
				<Frame id="02" name="Film 2" author="Frederic Cartier" bg="#1a1a1a">
					<Scene position={[0, -1, -1]} />
					<ambientLight intensity={2} />
				</Frame>
			</group>
			<group position={[1.15, 0, 0.25]} rotation={[0, -0.5, 0]} ref={portal3Ref}>
				<Frame id="03" name="Film 3" author="Frederic Cartier" bg="#d1d1ca">
					<Scene position={[0, -1, -1]} />
					<ambientLight intensity={2} />
				</Frame>
			</group>
			{/* <Rig /> */}
		</group>
	);
}
