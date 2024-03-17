import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useRef, useContext } from 'react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../store/userContext';
import InputContextProvider from '../store/inputContext';
import * as animate from '@/components/Animate';

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
	const { activeObject, portalsActive, aboutMeActive } = useContext(InputContextProvider);
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
	const defaultZoomMobile = 0.9;
	const defaultZoomDesktop = 1.5;
	const zoomDesktop = 3;
	const zoomMobile = 1.5;
	useFrame((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		camera.lookAt(focus.current.x, focus.current.y, focus.current.z);
		if (aboutMeActive) {
			animate.LerpVec(camera.position, camVecs.current.aboutMe.pos, speed);
			animate.LerpVec(focus.current, camVecs.current.aboutMe.focus, speed);
			if (activeObject.current !== null) {
				const { point } = activeObject.current;
				if (point) {
					animate.LerpVec(focus.current, point, speed);
					camera.zoom = MathUtils.lerp(
						camera.zoom,
						mobile ? zoomMobile : zoomDesktop,
						zoomInSpeed
					);
				}
			} else {
				animate.LerpVec(focus.current, camVecs.current.aboutMe.focus, speed);
				camera.zoom = MathUtils.lerp(
					camera.zoom,
					mobile ? defaultZoomMobile : defaultZoomDesktop,
					zoomOutSpeed
				);
			}
		}
		if (portalsActive) {
			animate.LerpVec(camera.position, camVecs.current.portals.pos, speed);
			animate.LerpVec(focus.current, camVecs.current.portals.focus, speed);
			camera.zoom = MathUtils.lerp(
				camera.zoom,
				mobile ? defaultZoomMobile : defaultZoomDesktop,
				zoomOutSpeed
			);
		}

		camera.updateProjectionMatrix();
		ToggleCamFov(camera, mobile);
		preventCamPosOutsideBounds(state);
	});

	return null;
}
