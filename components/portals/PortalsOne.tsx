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
import dynamic from 'next/dynamic';

const SmallRoom = dynamic(
	() => import('../../models/4096/PortalInteriorJoined').then((mod) => mod.Model),
	{
		ssr: false,
	}
);
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

interface Props {
	active: boolean;
}
export default function PortalsOne(props: Props) {
	const { active } = props;

	const { mobile } = useContext(UserContextProvider);

	const [portal2vector, setPortal2Vector] = useState(new THREE.Vector3(0, 0, -50));
	const [portal3vector, setPortal3Vector] = useState(new THREE.Vector3(1, 0, -100));
	// const [portal1vectorActive, setPortal1VectorActive] = useState(
	// 	new THREE.Vector3(-1.15, 0, 0.25)
	// );
	const [portal2vectorActive, setPortal2VectorActive] = useState(new THREE.Vector3(0, 0, 0));
	const [portal3vectorActive, setPortal3VectorActive] = useState(
		new THREE.Vector3(1.15, 0, 0.25)
	);
	const [portalVecs, setPortalVecs] = useState<{
		p1: THREE.Vector3;
		p2: THREE.Vector3;
		p3: THREE.Vector3;
		p1active: THREE.Vector3;
		p2active: THREE.Vector3;
		p3active: THREE.Vector3;
	}>({
		p1: new THREE.Vector3(-1, 0, -75),
		p2: new THREE.Vector3(0, 0, -50),
		p3: new THREE.Vector3(1, 0, -100),
		p1active: new THREE.Vector3(-1.15, 0, 0.25),
		p2active: new THREE.Vector3(0, 0, 0),
		p3active: new THREE.Vector3(1.15, 0, 0.25),
	});
	const scroll = useScroll();
	const portalsRef = useRef<THREE.Group>();
	const portal1Ref = useRef<THREE.Group>();
	const portal2Ref = useRef<THREE.Group>();
	const portal3Ref = useRef<THREE.Group>();
	const scrollSpeed = useRef(0);
	const scrollDirection = useRef(0);
	const { pointer, controls } = useThree();
	useFrame((state) => {
		const offset = 1 - scroll.offset;
		// console.log(scrollDirection.current);

		if (scroll.offset > scrollSpeed.current) {
			scrollDirection.current = 1;
			console.log('scrolling down');
			// portal1Ref.current.position.lerpVectors(portalVecs.p1, portalVecs.p1active, 0.1);
		} else if (scroll.offset < scrollSpeed.current) {
			scrollDirection.current = -1;
			console.log('scrolling up');
		}

		scrollSpeed.current = scroll.offset;
		portal1Ref.current.position.lerpVectors(portalVecs.p1, portalVecs.p1active, scroll.offset);
		portal2Ref.current.position.lerpVectors(portalVecs.p2, portalVecs.p2active, scroll.offset);
		portal3Ref.current.position.lerpVectors(portalVecs.p3, portalVecs.p3active, scroll.offset);
		// portal2Ref.current.position.lerpVectors(portal2vector, portal2vectorActive, scroll.offset);
		// portal3Ref.current.position.lerpVectors(portal3vector, portal3vectorActive, scroll.offset);
	});
	return (
		<group ref={portalsRef} position={[0, 0, 0]}>
			<group position={[-1.15, 0, -50]} rotation={[0, 0.5, 0]} ref={portal1Ref}>
				<Frame id="02" name="Film 2" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={1} />
				</Frame>
			</group>
			<group ref={portal2Ref}>
				<Frame id="01" name="Film 1" author="Frederic Cartier" bg="#fff">
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
			<group position={[1.15, 0, 0.25]} rotation={[0, -0.5, 0]} ref={portal3Ref}>
				<Frame id="03" name="Film 3" author="Frederic Cartier" bg="#fff">
					<SmallRoom position={[0, -1, 0]} />
					<ambientLight intensity={1} />
				</Frame>
			</group>
			{/* <Rig /> */}
			{/* <Shake /> */}
		</group>
	);
}
