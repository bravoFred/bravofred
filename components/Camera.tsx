import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useRef, useContext } from 'react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../store/userContext';
import InputContextProvider from '../store/inputContext';
import * as animate from '@/components/Animate';
import { easing, geometry } from 'maath';

function preventCamPosOutsideBounds(state: {
	camera: { position: { x: number; z: number; y: number } };
}) {
	const { camera } = state;
	const xLimit = 2.2;
	const zLimit = -3;
	const yLimit = 0.1;
	// if (camera.position.x > xLimit)
	// 	state.camera.position.x = MathUtils.lerp(state.camera.position.x, xLimit, 1);
	// if (camera.position.z < zLimit)
	// 	state.camera.position.z = MathUtils.lerp(state.camera.position.z, zLimit, 1);
	if (camera.position.y < yLimit)
		state.camera.position.y = MathUtils.lerp(state.camera.position.y, yLimit, 1);
}
function ToggleCamFov(camera: { fov: number }, mobile: boolean) {
	mobile ? (camera.fov = 30) : (camera.fov = 45);
}
export default function Camera() {
	const { mobile } = useContext(UserContextProvider);
	const { activeObject, portalsActive, aboutMeActive, icon1Hovered, icon2Hovered, icon3Hovered } =
		useContext(InputContextProvider);
	const camVecs = useRef({
		aboutMe: {
			pos: new THREE.Vector3(0, 0.1, 5),
			focus: new THREE.Vector3(0, 1, 0),
		},
		portals: {
			pos: new THREE.Vector3(0, 0.5, 5),
			focus: new THREE.Vector3(0, 1, 0),
		},
	});
	const focus = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
	const scroll = useScroll();
	const speed = mobile ? 0.05 : 0.02;
	const zoomInSpeed = mobile ? 0.05 : 0.1;
	const zoomOutSpeed = mobile ? 0.1 : 0.05;
	const defaultZoom = mobile ? 0.9 : 1.5;
	// const defaultZoomDesktop = 1.5;
	const zoomLevel = mobile ? 1.5 : 3;
	// const zoomMobile = 1.5;
	useFrame((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		// console.log(camera.zoom);
		// console.log(activeObject.current);
		// console.log(icon1Hovered.current, icon2Hovered.current, icon3Hovered.current);

		camera.lookAt(focus.current.x, focus.current.y, focus.current.z);
		if (aboutMeActive) {
			animate.EaseVec(camera.position, camVecs.current.aboutMe.pos, 0.5, speed);
			if (activeObject.current) {
				const { point } = activeObject.current;
				if (point) {
					// animate.EaseVec(focus.current, point, 1, speed);
					// camera.zoom = MathUtils.lerp(camera.zoom, zoomLevel, zoomInSpeed / 2);
				}
			} else {
				activeObject.current = null;
				animate.EaseVec(focus.current, camVecs.current.aboutMe.focus, 0.5, speed);
				camera.zoom = MathUtils.lerp(camera.zoom, defaultZoom, zoomOutSpeed / 3);
			}
		}
		if (portalsActive) {
			animate.EaseVec(camera.position, camVecs.current.portals.pos, 0.5, speed);
			animate.EaseVec(focus.current, camVecs.current.portals.focus, 0.5, speed);
			// camera.zoom = MathUtils.lerp(camera.zoom, zoomLevel, zoomInSpeed / 2);
			camera.zoom = defaultZoom;
		}
		camera.updateProjectionMatrix();
		ToggleCamFov(camera, mobile);
		preventCamPosOutsideBounds(state);
	});

	return null;
}
