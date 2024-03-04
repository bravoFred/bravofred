import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { MathUtils } from 'three';
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
export default function Camera() {
	const { gl, camera } = useThree();

	useFrame((state) => {
		preventCamPosOutsideBounds(state);
	});

	return null;
}
