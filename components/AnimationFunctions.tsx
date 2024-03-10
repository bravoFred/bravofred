import { MathUtils } from 'three';
export function MoveGroup(
	ref: React.MutableRefObject<THREE.Group>,
	target: THREE.Vector3,
	speed: number
) {
	ref.current.position.z = MathUtils.lerp(ref.current.position.z, target.z, speed);
}
