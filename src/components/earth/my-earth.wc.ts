import {
	AmbientLight,
	Camera,
	Clock,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	ShaderMaterial,
	SphereGeometry,
	Vector2,
	Vector3,
	WebGLRenderer,
	type BufferGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createDotsSphereMesh, spherePointToUV } from "./utils";

const RADIUS = 0.765 * 0.88;

const SCENE_ANTIALIAS = true;
const SCENE_ALPHA = true;
const SCENE_BACKGROUND_COLOR = 0x000000;

const CAMERA_FOV = 25;
const CAMERA_NEAR = 45;
const CAMERA_FAR = 500;
const CAMERA_X = 150;
const CAMERA_Y = 90;
const CAMERA_Z = -150;

const SPHERE_RADIUS = 30;
const LATITUDE_COUNT = 256;
const DOT_DENSITY = 1;

const DOT_SIZE = 0.1;
// red color
const DOT_COLOR = 0xffffff;
// const DOT_COLOR = 0x651119;
// const DOT_COLOR = 0x333333;

function sampleImage(imageData: ImageData, uv: Vector2) {
	// Calculate and return the data for the point, from the UV coordinates.
	const point =
		4 * Math.floor(uv.x * imageData.width) +
		Math.floor(uv.y * imageData.height) * (4 * imageData.width);

	return imageData.data.slice(point, point + 4);
}

export class MyEarth extends HTMLElement {
	#canvas: HTMLCanvasElement;
	#scene: Scene;
	#earth: Mesh<SphereGeometry, MeshBasicMaterial>;
	#dotsSphereMesh: Mesh<BufferGeometry, ShaderMaterial>;
	#camera: PerspectiveCamera;
	#clock: Clock;
	#controls: OrbitControls;
	#renderer: WebGLRenderer;
	#animationID: number | null;
	#texture: HTMLImageElement;
	#resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
		const sizeOfTheContainer = entries[0].contentRect;
		if (sizeOfTheContainer === undefined) return;
		this.#handleResize(sizeOfTheContainer.width, sizeOfTheContainer.height);
	});

	#dragStartTime: number = 0;
	#dragTime: number = 0;

	#rotationEnabled = true;
	#isDragging = false;

	async connectedCallback() {
		this.attachShadow({ mode: "open" });

		this.style.display = "block";
		// this.style.mixBlendMode = "difference";

		this.#renderer = new WebGLRenderer({
			antialias: SCENE_ANTIALIAS,
			alpha: SCENE_ALPHA,
		});
		this.#canvas = this.#renderer.domElement;

		this.#texture = await this.#loadTextures();

		const { scene, sphere, dotsSphereMesh } = this.#createScene(
			this.#texture,
			this.#canvas,
		);
		this.#dotsSphereMesh = dotsSphereMesh;
		this.#scene = scene;
		this.#earth = sphere;
		this.#camera = this.#createCamera(this.#canvas, this.#earth.position);
		this.#controls = this.#createControls(this.#camera, this);
		this.#clock = new Clock();

		this.#handleDPIChange(window.visualViewport?.scale ?? 1);

		this.#resizeObserver.observe(this);
		window.visualViewport?.addEventListener("resize", () =>
			this.#handleDPIChange(Math.min(window.visualViewport?.scale ?? 1, 3)),
		);

		this.shadowRoot?.appendChild(this.#renderer.domElement);
		this.#run();
	}

	disconnectedCallback() {
		this.#resizeObserver.disconnect();
		this.#animationID && cancelAnimationFrame(this.#animationID);
	}

	#run = () => {
		this.#animationID = requestAnimationFrame(this.#run);

		const time = this.#clock.getElapsedTime();
		this.#updateDragTimer();

		if (this.#rotationEnabled) {
			this.#camera.position.x = Math.sin(time / 10) * 100;
			this.#camera.position.z = Math.cos(time / 10) * 100;

			this.#lookAtEarth();
		}

		this.#dotsSphereMesh.material.uniforms.u_drag_time.value = this.#dragTime;
		this.#dotsSphereMesh.material.uniforms.u_time.value =
			performance.now() - this.#dragStartTime;

		this.#controls.update();

		this.#render();
	};

	#render = () => this.#renderer.render(this.#scene, this.#camera);

	#startDragging() {
		if (this.#isDragging) return;

		this.#isDragging = true;
		document.body.style.cursor = "grabbing";

		this.#dragStartTime = performance.now();

		this.#dotsSphereMesh.material.uniforms.u_time.value =
			performance.now() - this.#dragStartTime;
	}

	#stopDragging() {
		this.#isDragging = false;
	}

	#updateDragTimer() {
		if (this.#isDragging) {
			this.#dragTime = performance.now() - this.#dragStartTime;
		} else {
			if (this.#dragTime > 0.1) {
				this.#dragTime = Math.max(0, this.#dragTime * 0.9);
			}
		}
	}

	#loadTextures = () =>
		new Promise<HTMLImageElement>((resolve, reject) => {
			const img = this.querySelector("img");

			if (!img) {
				return reject(new Error("Image not found"));
			}

			if (img.complete) {
				return resolve(img);
			}

			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error(`Failed to load image ${img.src}`));
		});

	#handleResize = (width: number, height: number) => {
		this.#renderer.setSize(width, height);
		this.#camera.aspect = width / height;
		this.#camera.updateProjectionMatrix();

		this.#render();
	};

	#handleDPIChange = (scale: number) => {
		this.#renderer.setPixelRatio(window.devicePixelRatio * scale);
	};

	#createCamera = (canvas: HTMLCanvasElement, lookAt: Vector3) => {
		const camera = new PerspectiveCamera(
			CAMERA_FOV,
			canvas.width / canvas.height,
			CAMERA_NEAR,
			CAMERA_FAR,
		);

		camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
		camera.lookAt(lookAt);

		return camera;
	};

	#createControls = (camera: Camera, domElement: HTMLElement) => {
		const controls = new OrbitControls(camera, domElement);

		controls.enableDamping = true;
		controls.dampingFactor = 0.01;
		controls.rotateSpeed = 0.5;
		controls.enablePan = false;
		controls.enableZoom = false;
		controls.minPolarAngle = 270 / 360;
		controls.maxPolarAngle = (360 + 180) / 360;

		let timeoutId: number | null = null;

		controls.addEventListener("start", () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			this.#rotationEnabled = false;
			this.#startDragging();
		});

		controls.addEventListener("end", () => {
			document.body.style.cursor = "";
			this.#stopDragging();
		});

		return controls;
	};

	#createScene = (texture: HTMLImageElement, canvas: HTMLCanvasElement) => {
		const scene = new Scene();

		const geometryR = new SphereGeometry(SPHERE_RADIUS, 64, 64);
		const materialR = new MeshBasicMaterial({ color: SCENE_BACKGROUND_COLOR });

		const sphere = new Mesh(geometryR, materialR);

		scene.add(new AmbientLight(0x909090));

		const tempCanvas = document.createElement("canvas");

		tempCanvas.width = texture.width;
		tempCanvas.height = texture.height;

		const ctx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;

		ctx.drawImage(texture, 0, 0);

		// Read the image data from the canvas context.
		const imageData = ctx.getImageData(0, 0, texture.width, texture.height);

		// Add the dot mesh to the scene.
		const dotsSphereMesh = createDotsSphereMesh({
			latitudeCount: LATITUDE_COUNT,
			dotDensity: DOT_DENSITY,
			dotSize: DOT_SIZE,
			dotColor: DOT_COLOR,
			sphereRadius: SPHERE_RADIUS,
			width: canvas.width,
			height: canvas.height,
			filter: (dotGeometry) => {
				dotGeometry.computeBoundingSphere();

				if (!dotGeometry.boundingSphere) {
					return false;
				}

				// Find the UV position of the dot on the land image.
				const uv = spherePointToUV(
					dotGeometry.boundingSphere.center,
					new Vector3(),
				);

				// Sample the pixel on the land image at the given UV position.
				const sampledPixel = sampleImage(imageData, uv);

				return sampledPixel[3] !== 0;
			},
		});

		scene.add(dotsSphereMesh);
		scene.add(sphere);

		return { scene, sphere, dotsSphereMesh };
	};

	#lookAtEarth = () => {
		this.#camera.lookAt(this.#earth.position);
	};
}
