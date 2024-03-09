// 1k texture resolution models
import { useState, useEffect, useRef, useContext, use } from 'react';
import { Perf } from 'r3f-perf';
import {
	AdaptiveDpr,
	AdaptiveEvents,
	PerformanceMonitor,
	DeviceOrientationControls,
} from '@react-three/drei';
import { useControls, folder, button } from 'leva';
import UserContextProvider from '../store/userContext';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import {DeviceOrientationControls} from 'three/examples/jsm/controls/DeviceOrientationControls';
import chalk from 'chalk';

export default function Performance() {
	const { activeTab, frameloop, setFrameloop, dev, mobile, setMobile } =
		useContext(UserContextProvider);
	useEffect(() => {
		if (!activeTab) setFrameloop('never');
		if (activeTab) setFrameloop('always');
	}, [activeTab, frameloop, setFrameloop]);
	const [dpr, setDpr] = useState(1);
	const [deviceDpr, setDeviceDpr] = useState(1);

	const camPositions = useRef<Array<THREE.Vector3>>([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0),
	]);
	const camSpeed = useRef(0);
	const stoppedMoving = useRef(true);

	function getCameraSpeed(camPositions) {
		const yDistance = Math.abs(Number(camPositions[0].y) - Number(camPositions[1].y));
		const xDistance = Math.abs(Number(camPositions[0].x) - Number(camPositions[1].x));
		const zDistance = Math.abs(Number(camPositions[0].z) - Number(camPositions[1].z));
		const speed = yDistance + xDistance + zDistance;
		return speed;
	}
	function checkIfStoppedMoving(camSpeed) {
		const threshold = 0.001; // lower value = waits longer to up-res, higher = up-res sooner, but at risk up res before camera stops moving
		if (camSpeed < threshold) return true;
		else return false;
	}
	function getDifference(number) {
		if (1 - Math.round(Math.abs(number) * 10) / 10 < 0.5) return 1;
		else return 1 - Math.round(Math.abs(number) * 10) / 10;
	}
	const downResMsgDisplayed = useRef(false);
	const upResMsgDisplayed = useRef(false);
	useFrame((state) => {
		const clock = new THREE.Clock();
		const camera = state.camera as THREE.PerspectiveCamera;
		// console.log(camera.fov);
		const gl = state.gl;

		// , clock }) => {
		// camPositions.current.push(camera.position.clone());
		// camPositions.current.shift();
		// camSpeed.current = getCameraSpeed(camPositions.current);
		// stoppedMoving.current = checkIfStoppedMoving(camSpeed.current);
		// if (!stoppedMoving.current) {
		// 	setDpr(getDifference(camSpeed.current));
		// }
		// if (stoppedMoving.current) setDpr(mobile ? deviceDpr / 2 : deviceDpr);
		// if (dpr < 1.1 && !upResMsgDisplayed.current) {
		// 	console.log(`downscale`);
		// 	upResMsgDisplayed.current = true;
		// 	downResMsgDisplayed.current = false;
		// }
		// if (dpr === 2 && !downResMsgDisplayed.current) {
		// 	console.log(`upscale`);
		// 	downResMsgDisplayed.current = true;
		// 	upResMsgDisplayed.current = false;
		// }
		// gl.setPixelRatio(dpr);
		// console.log(dpr);
		// change camera fov based on window
		// console.log(camera);

		const fov = camera.fov;
		const aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
		const near = camera.near;
		const far = camera.far;
		mobile ? (camera.fov = 30) : (camera.fov = 45);
	});
	useEffect(() => {
		// if (frameloop === 'never') console.log(`scene frozen`);
		// if (frameloop === 'always') console.log(`scene unfrozen`);
	}, [frameloop]);
	// listen for window resize event
	useEffect(() => {
		function handleResize() {
			window.innerWidth < 768 ? setMobile(true) : setMobile(false);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<>
			{!mobile && (
				<Perf
					position={'top-left'}
					showGraph={false}
					style={{ position: 'absolute', top: '15vh', left: '0px' }}
				/>
			)}

			<AdaptiveDpr />
			<AdaptiveEvents />
			{mobile && (
				<PerformanceMonitor onIncline={() => setDpr(dpr / 2)} onDecline={() => setDpr(1)} />
			)}
			{!mobile && (
				<PerformanceMonitor onIncline={() => setDpr(dpr)} onDecline={() => setDpr(1)} />
			)}
		</>
	);
}
