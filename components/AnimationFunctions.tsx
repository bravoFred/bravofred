import { MathUtils } from 'three';
export function LerpAll(
	ref: React.MutableRefObject<THREE.Group>,
	target: THREE.Vector3,
	speed: number
) {
	ref.current.position.z = MathUtils.lerp(ref.current.position.z, target.z, speed);
	ref.current.position.x = MathUtils.lerp(ref.current.position.x, target.x, speed);
	ref.current.position.y = MathUtils.lerp(ref.current.position.y, target.y, speed);
}
export function ScaleAll(
	ref: React.MutableRefObject<THREE.Group>,
	target: THREE.Vector3,
	speed: number
) {
	ref.current.scale.x = MathUtils.lerp(ref.current.scale.x, target.x, speed);
	ref.current.scale.y = MathUtils.lerp(ref.current.scale.y, target.y, speed);
	ref.current.scale.z = MathUtils.lerp(ref.current.scale.z, target.z, speed);
}
