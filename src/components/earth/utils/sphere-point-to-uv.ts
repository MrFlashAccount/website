import { Vector2, Vector3 } from "three";

export function spherePointToUV(
	dotCenter: Vector3,
	sphereCenter: Vector3,
): Vector2 {
	// Create a new vector and give it a direction from the center of the sphere
	// to the center of the dot.
	const newVector = new Vector3();
	newVector.subVectors(sphereCenter, dotCenter).normalize();

	// Calculate the UV coordinates of the dot and return them as a vector.
	const uvX = 1 - (0.5 + Math.atan2(newVector.z, newVector.x) / (2 * Math.PI));
	const uvY = 0.5 + Math.asin(newVector.y) / Math.PI;

	return new Vector2(uvX, uvY);
}
