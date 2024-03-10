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

function focusCam(
	state: { camera?: any; controls: any },
	cam: { camPos: number[]; speed: number[]; camTarget: number[] },
	clickTarget: any,
	delta?: any
) {
	state.camera.position.x = MathUtils.lerp(state.camera.position.x, cam.camPos[0], cam.speed[0]);
	// state.camera.position.x = easing.damp(state.camera.position.x, cam.camPos[0], 0.1, delta); // arg1: current, arg2: target, arg3: speed, arg4: delta
	state.camera.position.y = MathUtils.lerp(state.camera.position.y, cam.camPos[1], cam.speed[1]);
	state.camera.position.z = MathUtils.lerp(state.camera.position.z, cam.camPos[2], cam.speed[2]);
	const vec = new THREE.Vector3();
	if (state.controls)
		lerpCamTarget(state, vec.set(cam.camTarget[0], cam.camTarget[1], cam.camTarget[2]), 0.05); // posters
	// lerpCamTarget(state, clickTarget, 0.05); // this is auto to click
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
	useFrame((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		const speed = mobile ? 0.05 : 0.02;
		const zoomSpeed = mobile ? 0.05 : 0.1;
		if (aboutMeActive.current) {
			camera.lookAt(target.current.x, target.current.y, target.current.z);
			if (activeObject.current !== null) {
				const { object, point } = activeObject.current;
				if (point)
					if (aboutMeActive.current) {
						target.current.x = MathUtils.lerp(target.current.x, point.x, speed);
						target.current.y = MathUtils.lerp(target.current.y, point.y, speed * 2);
						target.current.z = MathUtils.lerp(target.current.z, point.z, speed);
						camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 1.5 : 3, zoomSpeed);
					}
			} else {
				target.current.x = MathUtils.lerp(target.current.x, 0, speed);
				target.current.y = MathUtils.lerp(target.current.y, 1, speed);
				target.current.z = MathUtils.lerp(target.current.z, 0, speed);
				camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 0.9 : 1.5, zoomSpeed);
			}
			camera.updateProjectionMatrix();
		}
		if (portalsActive.current) {
			camera.zoom = MathUtils.lerp(camera.zoom, mobile ? 0.9 : 1.5, zoomSpeed);
		}
		// }

		// camera.lookAt(activeObject.current.object.position);
		// if (activeObject.current.object && activeObject.current.point) {
		// 	const { object, point } = activeObject.current;
		// 	console.log(point);

		// 	target.current.x = MathUtils.lerp(target.current.x, point.x, 0.1);
		// 	target.current.y = MathUtils.lerp(target.current.y, point.y, 0.1);
		// 	target.current.z = MathUtils.lerp(target.current.z, point.z, 0.1);
		// }
		// move camera up with scroll
		if (portalsActive.current) {
			camera.position.y = MathUtils.lerp(camera.position.y, scroll.offset * 1.5, 0.1);
		}
		if (aboutMeActive.current) {
			camera.position.y = MathUtils.lerp(camera.position.y, scroll.offset, 0.1);
		}
		// camera.position.y = MathUtils.lerp(camera.position.y, 0.5 + scroll.offset * 3, 0.1);

		ToggleCamFov(camera, mobile);
		preventCamPosOutsideBounds(state);
	});

	return null;
}
