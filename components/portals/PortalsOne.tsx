// @ts-nocheck

import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, CameraControls, Text } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';
import { MathUtils } from 'three';
import dynamic from 'next/dynamic';
import { MoveGroup } from '../../components/AnimationFunctions';
const GOLDENRATIO = 1.61803398875;

const SmallRoom = dynamic(
	() => import('../../models/4096/PortalInteriorJoined').then((mod) => mod.Model),
	{
		ssr: false,
	}
);
const NavCam = dynamic(() => import('../../models/4096/Cam').then((mod) => mod.Model), {
	ssr: false,
});
const Warehouse = dynamic(
	() => import('../../models/4096/WarehouseJoined').then((mod) => mod.Model),
	{
		ssr: false,
	}
);
function Rig({ position = new THREE.Vector3(0, 0.1, 5), focus = new THREE.Vector3(0, 1, 0) }) {
	const { controls, scene } = useThree();
	const [, params] = useRoute('/item/:id') as any;
	useEffect(() => {
		const active = scene.getObjectByName(params?.id);
		if (active) {
			active.parent.localToWorld(position.set(0, 0.5, 3)); // this is the position of the camera
			active.parent.localToWorld(focus.set(0, 1, -2));
		}
		controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
	});
	return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}
function Frame({ id, name, author, bg, width = 1, height = GOLDENRATIO, children, ...props }) {
	const portal = useRef();
	const [, setLocation] = useLocation();
	const [, params] = useRoute<{ id: string }>('/item/:id');
	const [hovered, hover] = useState(false);
	useCursor(hovered);
	useFrame(
		(state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
		//
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
				{/* args are width heigh, radius */}
				<roundedPlaneGeometry args={[width, height, 0.22]} />
				{/* <boxGeometry args={[width, height, 0.01]} /> */}
				{/* <planeGeometry args={[width, height, 0.1]} /> */}
				<MeshPortalMaterial
					ref={portal}
					events={params?.id === id}
					side={THREE.DoubleSide}
					// blend={0.5}
				>
					<color attach="background" args={[bg]} />
					{children}
				</MeshPortalMaterial>
			</mesh>
		</group>
	);
}

export default function PortalsOne() {
	const { mobile } = useContext(UserContextProvider);
	const { portalsActive, aboutMeActive, setPortal1active, setPortal2active, setPortal3active } =
		useContext(InputContextProvider);
	const [portalRigActive, setPortalRigActive] = useState(false);
	const scroll = useScroll();
	const portalsRef = useRef<THREE.Group>();
	const baseSpeed = 0.1;
	const [p1, setP1] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(-1.15, 0, 0.25),
		hidden: new THREE.Vector3(-1, 0, -75),
		enterSpeed: baseSpeed * 1.5,
		exitSpeed: baseSpeed * 1.5,
	});
	const [p2, setP2] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(0, 0, 0),
		hidden: new THREE.Vector3(0, 0, -50),
		enterSpeed: baseSpeed * 2,
		exitSpeed: baseSpeed * 2,
	});
	const [p3, setP3] = useState({
		ref: useRef<THREE.Group>(),
		active: new THREE.Vector3(1.15, 0, 0.25),
		hidden: new THREE.Vector3(1, 0, -100),
		enterSpeed: baseSpeed,
		exitSpeed: baseSpeed,
	});
	useFrame((state) => {
		if (aboutMeActive.current) {
			MoveGroup(portalsRef, new THREE.Vector3(0, 0, -50), baseSpeed); // hides the group

			setPortalRigActive(false);
			MoveGroup(p1.ref, p1.hidden, p1.exitSpeed);
			MoveGroup(p2.ref, p2.hidden, p2.exitSpeed);
			MoveGroup(p3.ref, p3.hidden, p3.exitSpeed);
		}
		if (portalsActive.current) {
			MoveGroup(portalsRef, new THREE.Vector3(0, 0, 0), baseSpeed); // shows the group

			setPortalRigActive(true);
			MoveGroup(p1.ref, p1.active, p1.enterSpeed);
			MoveGroup(p2.ref, p2.active, p2.enterSpeed);
			MoveGroup(p3.ref, p3.active, p3.enterSpeed);
		}
	});
	return (
		<group ref={portalsRef} position={[0, 0, -100]}>
			<group
				position={[-1.15, 0, -50]}
				rotation={[0, 0.5, 0]}
				ref={p1.ref}
				onClick={() => setPortal1active(true)}
			>
				<Frame id="01" name="Film 1" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={3} />
				</Frame>
			</group>
			<group ref={p2.ref} onClick={() => setPortal2active(true)}>
				<Frame id="02" name="Film 2" author="Frederic Cartier" bg="#fff">
					<Warehouse
						position={[5, -1, -5]}
						rotation={[
							MathUtils.degToRad(0),
							MathUtils.degToRad(-45),
							MathUtils.degToRad(0),
						]}
					/>
					<ambientLight intensity={3.5} />
				</Frame>
			</group>
			<group
				position={[1.15, 0, 0.25]}
				rotation={[0, -0.5, 0]}
				ref={p3.ref}
				onClick={() => setPortal3active(true)}
			>
				<Frame id="03" name="Film 3" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={3} />
				</Frame>
			</group>

			{/* <group position={[0, 1, -2]} scale={[0.5, 0.5, 0.5]}>
				<NavCam />
			</group> */}
			{portalRigActive && <Rig />}
			{/* <Shake /> */}
		</group>
	);
}
