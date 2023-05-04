import {
	BufferGeometry,
	CircleGeometry,
	DoubleSide,
	Mesh,
	ShaderMaterial,
	Float32BufferAttribute,
	Vector3,
	type ColorRepresentation,
	Vector2,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import vertexShader from "./vertex-shader.glsl?raw";
import fragmentShader from "./fragment-shader.glsl?raw";

declare namespace createDotsSphere {
	type Props = {
		dotSize: number;
		dotDensity: number;
		dotColor?: ColorRepresentation;
		latitudeCount: number;
		sphereRadius: number;
		filter?: (dotGeometry: CircleGeometry) => boolean;
		width: number;
		height: number;
	};
}

export function createDotsSphereMesh(
	props: createDotsSphere.Props,
): Mesh<BufferGeometry, ShaderMaterial> {
	return new Mesh(
		createDotsSphere(props),
		new ShaderMaterial({
			side: DoubleSide,
			// transparent: true,
			uniforms: {
				u_time: { value: 0 },
				u_drag_time: { value: 0 },
				u_resolution: { value: new Vector2(props.width, props.height) },
			},
			vertexShader,
			fragmentShader,
		}),
	);
}

export function createDotsSphere(
	props: createDotsSphere.Props,
): BufferGeometry {
	const {
		dotDensity,
		dotSize,
		latitudeCount,
		sphereRadius,
		filter = () => true,
	} = props;
	// Define an array to hold the geometries of all the dots.
	const dotGeometries = [];

	// Create a blank vector to be used by the dots.
	const vector = new Vector3();

	// Loop across the latitude lines.
	for (let lat = 0; lat < latitudeCount; lat += 1) {
		// Calculate the radius of the latitude line.
		const radius =
			Math.cos((-90 + (180 / latitudeCount) * lat) * (Math.PI / 180)) *
			sphereRadius;
		// Calculate the circumference of the latitude line.
		const latitudeCircumference = radius * Math.PI * 2 * 2;
		// Calculate the number of dots required for the latitude line.
		const latitudeDotCount = Math.ceil(latitudeCircumference * dotDensity);

		// Loop across the dot count for the latitude line.
		for (let dot = 0; dot < latitudeDotCount; dot += 1) {
			const dotGeometry = new CircleGeometry(dotSize, 5);
			// Calculate the phi and theta angles for the dot.
			const phi = (Math.PI / latitudeCount) * lat;
			const theta = ((2 * Math.PI) / latitudeDotCount) * dot;

			// const phi = Math.acos(-1 + (2 * dot) / latitudeDotCount);
			// const theta = Math.sqrt(latitudeDotCount * Math.PI) * phi;

			// Set the vector using the spherical coordinates generated from the sphere radius, phi and theta.
			vector.setFromSphericalCoords(sphereRadius, phi, theta);

			// Make sure the dot is facing in the right direction.
			dotGeometry.lookAt(vector);

			// Move the dot geometry into position.
			dotGeometry.translate(vector.x, vector.y, vector.z);

			if (!filter(dotGeometry)) continue;

			// Push the positioned geometry into the array.
			dotGeometries.push(dotGeometry);
		}
	}

	// Merge all the dot geometries together into one buffer geometry.
	return mergeGeometries(dotGeometries);
}
