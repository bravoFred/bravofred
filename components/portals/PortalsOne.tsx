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
	Billboard,
	ScreenSpace,
	ScreenSizer,
	Box,
} from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';
import { MathUtils } from 'three';
import dynamic from 'next/dynamic';
import { MoveGroup } from '../../components/AnimationFunctions';

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

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
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

export default function PortalsOne() {
	const { mobile } = useContext(UserContextProvider);
	const { portalsActive } = useContext(InputContextProvider);

	const [portal2vector, setPortal2Vector] = useState(new THREE.Vector3(0, 0, -50));
	const [portal3vector, setPortal3Vector] = useState(new THREE.Vector3(1, 0, -100));
	// const [portal1vectorActive, setPortal1VectorActive] = useState(
	// 	new THREE.Vector3(-1.15, 0, 0.25)
	// );
	const [portal2vectorActive, setPortal2VectorActive] = useState(new THREE.Vector3(0, 0, 0));
	const [portal3vectorActive, setPortal3VectorActive] = useState(
		new THREE.Vector3(1.15, 0, 0.25)
	);
	const [portalVecs, setPortalVecs] = useState({
		p1: new THREE.Vector3(-1, 0, -75),
		p2: new THREE.Vector3(0, 0, -50),
		p3: new THREE.Vector3(1, 0, -100),
		p1active: new THREE.Vector3(-1.15, 0, 0.25),
		p2active: new THREE.Vector3(0, 0, 0),
		p3active: new THREE.Vector3(1.15, 0, 0.25),
	});
	const scroll = useScroll();
	const portalsRef = useRef<THREE.Group>();
	const p1ref = useRef<THREE.Group>();
	const p2ref = useRef<THREE.Group>();
	const p3ref = useRef<THREE.Group>();
	const enterSpeed = 0.1;
	const exitSpeed = 0.1;
	const miniRef = useRef<THREE.Group>();
	useFrame((state) => {
		if (portalsActive.current) {
			MoveGroup(p1ref, portalVecs.p1active, enterSpeed * 1.5);
			MoveGroup(p2ref, portalVecs.p2active, enterSpeed * 2);
			MoveGroup(p3ref, portalVecs.p3active, enterSpeed);
		} else {
			MoveGroup(p1ref, portalVecs.p1, exitSpeed * 1.5);
			MoveGroup(p2ref, portalVecs.p2, exitSpeed * 2);
			MoveGroup(p3ref, portalVecs.p3, exitSpeed);
		}
		// if (!mobile) {
		// 	// desktop
		// 	miniRef.current.position.y = -state.viewport.height / 2 + 1.45; // move to bottom of screen space, desktop
		// 	miniRef.current.position.x = state.viewport.width / 2 - 1; // move to right of screen space desktop
		// } else {
		// 	// mobile
		// 	miniRef.current.position.y = -state.viewport.height / 2 + 2; // move to bottom of screen space, mobile
		// 	miniRef.current.position.x = state.viewport.width / 2 - 0.5; // move to right of screen space mobile
		// 	// move to in front of camera
		// 	miniRef.current.position.z = state.camera.position.z - 5;
		// }
		// miniRef.current.lookAt(state.camera.position); // look at camera
	});
	return (
		<group ref={portalsRef} position={[0, 0, 0]}>
			<group position={[-1.15, 0, -50]} rotation={[0, 0.5, 0]} ref={p1ref}>
				<Frame id="02" name="Film 2" author="Frederic Cartier" bg="#fff">
					<Warehouse
						position={[5, -1, -5]}
						rotation={[
							MathUtils.degToRad(0),
							MathUtils.degToRad(-45),
							MathUtils.degToRad(0),
						]}
					/>
					<ambientLight intensity={1} />
				</Frame>
			</group>
			<group ref={p2ref}>
				<Frame id="01" name="Film 1" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={1} />
				</Frame>
			</group>
			<group position={[1.15, 0, 0.25]} rotation={[0, -0.5, 0]} ref={p3ref}>
				<Frame id="03" name="Film 3" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={1} />
				</Frame>
			</group>

			{/* </ScreenSizer> */}
			{/* <Rig /> */}
			{/* <Shake /> */}
		</group>
	);
}
