// @ts-nocheck

import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, CameraControls, Text, Image } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../../store/userContext';
import InputContextProvider from '../../store/inputContext';
import { MathUtils } from 'three';
import dynamic from 'next/dynamic';
import { LerpGroupPos } from '../Animate';
const GOLDENRATIO = 1.61803398875;
import poster from '../../public/img/poster.jpeg';

const Warehouse = dynamic(
	() => import('../../models/4096/WarehouseJoined').then((mod) => mod.Model),
	{
		ssr: false,
	}
);

// ref.current.material.radius = 1;
// ref.current.material.zoom = 1;
// ref.current.material.grayscale = 0.5;
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
		(state, dt) => {
			if (hovered) {
				// imgRef.current.material.opacity = MathUtils.lerp(
				// 	imgRef.current.material.opacity,
				// 	0,
				// 	0.25
				// );
				// text1Ref.current.scale.setScalar(MathUtils.lerp(text1Ref.current.scale.x, 0, 0.55));
				// text2Ref.current.scale.setScalar(MathUtils.lerp(text2Ref.current.scale.x, 0, 0.25));
			} else {
				// imgRef.current.material.opacity = MathUtils.lerp(
				// 	imgRef.current.material.opacity,
				// 	1,
				// 	0.25
				// );
				// text1Ref.current.scale.setScalar(MathUtils.lerp(text1Ref.current.scale.x, 1, 0.25));
				// text2Ref.current.scale.setScalar(MathUtils.lerp(text2Ref.current.scale.x, 1, 0.25));
			}
			easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
		}
		//
	);
	const [text, setText] = useState(`FREDERIC${'\n'}CARTIER`);
	const [url, setUrl] = useState(
		'https://i.pinimg.com/originals/53/9a/79/539a79873138a294e02fd9a59288226a.jpg'
	);
	const imgRef = useRef();
	const text1Ref = useRef();
	const text2Ref = useRef();
	const [releaseText, setReleaseText] = useState('Summer 2024');
	return (
		<group {...props} position={[0, 1, 0]}>
			{/* <Foo /> */}
			<Image
				ref={imgRef}
				url={`/poster.jpeg`}
				transparent
				side={THREE.DoubleSide}
				opacity={1}
				clickable={false}
				// onPointerOver={pointerOver}
				// onPointerOut={pointerOut}
				{...props}
				alt="poster"
				position={[0, 0, 0.001]}
			>
				<roundedPlaneGeometry args={[width, height, 0.22]} />

				{/* <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} /> */}
			</Image>
			<Text
				ref={text1Ref}
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.2}
				{...props}
				textAlign="center"
				lineHeight={0.6}
				position={[0, 0, -0.001]}
				material-toneMapped={false}
				color={'#fff'}
			>
				{name}
			</Text>
			<Text
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.1}
				// anchorX="right"
				position={[0, 0, 0]}
				material-toneMapped={false}
				color={'#000'}
			>
				{/* {id} */}
				{/* {releaseText} */}
			</Text>
			<Text
				ref={text2Ref}
				font="/fonts/NimbusSanL-Bol.woff"
				fontSize={0.05}
				// anchorY="bottom-baseline"
				// anchorX="right"
				textAlign="center"
				// position={[0.0, -0.677, 0.01]}
				position={[0, -0.46, 0]}
				material-toneMapped={false}
				color={'#fff'}
			>
				{/* {author} */}
				{releaseText}
			</Text>
			<mesh
				name={id}
				// onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))}
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
		if (aboutMeActive) {
			LerpGroupPos(portalsRef, new THREE.Vector3(0, 0, -50), baseSpeed); // hides the group

			setPortalRigActive(false);
			// LerpGroupPos(p1.ref, p1.hidden, p1.exitSpeed);
			LerpGroupPos(p2.ref, p2.hidden, p2.exitSpeed);
			// LerpGroupPos(p3.ref, p3.hidden, p3.exitSpeed);
		}
		if (portalsActive) {
			LerpGroupPos(portalsRef, new THREE.Vector3(0, 0, 0), baseSpeed); // shows the group

			setPortalRigActive(true);
			// LerpGroupPos(p1.ref, p1.active, p1.enterSpeed);
			LerpGroupPos(p2.ref, p2.active, p2.enterSpeed);
			// LerpGroupPos(p3.ref, p3.active, p3.enterSpeed);
		}
	});
	const clickHandler = (e) => {
		// if (e.object.name === '01') {
		// 	setPortal1active(true);
		// 	setPortal2active(false);
		// 	setPortal3active(false);
		// }
		// if (e.object.name === '02') {
		// 	setPortal1active(false);
		// 	setPortal2active(true);
		// 	setPortal3active(false);
		// }
		// if (e.object.name === '03') {
		// 	setPortal1active(false);
		// 	setPortal2active(false);
		// 	setPortal3active(true);
		// }
	};
	const doubleClickHandler = (e) => {};

	const [portal1Name, setPortal1Name] = useState(`COMING
	${'\n'}SOON`);
	return (
		<group ref={portalsRef} position={[0, 0, -100]}>
			{/* <group
				position={[-1.15, 0, 0.25]}
				rotation={[0, 0.5, 0]}
				ref={p1.ref}
				onClick={(e) => clickHandler(e)}
			>
				<Frame id="01" name="Film 1" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={3} />
				</Frame
			</group> */}
			<group ref={p2.ref} rotation={[0, 0, 0]} onClick={(e) => clickHandler(e)}>
				<Frame id="01" name={portal1Name} author="Frederic Cartier" bg="#fff">
					{/* <Warehouse
						position={[5, -1, -5]}
						rotation={[
							MathUtils.degToRad(0),
							MathUtils.degToRad(-45),
							MathUtils.degToRad(0),
						]}
					/> */}
					<ambientLight intensity={3.5} />
				</Frame>
			</group>
			{/* <group
				position={[1.15, 0, 0.25]}
				rotation={[0, -0.5, 0]}
				ref={p3.ref}
				onClick={(e) => clickHandler(e)}
			>
				<Frame id="03" name="Film 3" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={3} />
				</Frame>
			</group> */}

			{/* {portalRigActive && <Rig />} */}
		</group>
	);
}
