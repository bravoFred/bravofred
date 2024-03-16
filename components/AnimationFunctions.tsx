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
