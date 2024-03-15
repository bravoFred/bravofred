import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useRef, useContext } from 'react';
import { useScroll } from '@react-three/drei';
import UserContextProvider from '../store/userContext';
import InputContextProvider from '../store/inputContext';
import { update } from 'three/examples/jsm/libs/tween.module.js';

function lerpCamTarget(
	state: { controls: { target: { x: number; y: number; z: number } } },
	target: THREE.Vector3,
	speed: number
) {
	state.controls.target.x = MathUtils.lerp(state.controls.target.x, target.x, speed / 3);
	state.controls.target.y = MathUtils.lerp(state.controls.target.y, target.y, speed / 1);
	state.controls.target.z = MathUtils.lerp(state.controls.target.z, target.z, speed / 3);
}

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
	// const { gl, camera } = useThree();
	const { mobile } = useContext(UserContextProvider);
	const { activeObject, portalsActive, aboutMeActive } = useContext(InputContextProvider);
	const camVecs = useRef({
		pos: new THREE.Vector3(0, 0, 0),
		target: new THREE.Vector3(0, 1, 0),
		camTarget: [0, 0, 0],
	});
	const target = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
	const scroll = useScroll();
	function lerpVecs(vec1: THREE.Vector3, vec2: THREE.Vector3, speed: number) {
		vec1.x = MathUtils.lerp(vec1.x, vec2.x, speed);
		vec1.y = MathUtils.lerp(vec1.y, vec2.y, speed);
		vec1.z = MathUtils.lerp(vec1.z, vec2.z, speed);
	}
	const speed = mobile ? 0.05 : 0.02;
	const zoomInSpeed = mobile ? 0.05 : 0.1;
	const zoomOutSpeed = mobile ? 0.1 : 0.05;
	useFrame((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		camera.lookAt(target.current.x, target.current.y, target.current.z);
		if (aboutMeActive.current) {
			if (activeObject.current !== null) {
				const { point } = activeObject.current;
				if (point) {
					lerpVecs(target.current, point, speed);
					camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 1.5 : 3, zoomInSpeed);
				}
			} else {
				lerpVecs(target.current, camVecs.current.target, speed);
				camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 0.9 : 1.5, zoomOutSpeed);
			}
		}
		if (portalsActive.current) {
			// lerpVecs(target.current, camVecs.current.camTarget, speed);
			// camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 0.9 : 1.5, zoomOutSpeed);
		}

		camera.updateProjectionMatrix();
		ToggleCamFov(camera, mobile);
		preventCamPosOutsideBounds(state);
	});

	return null;
}
