import {
  AmbientLight,
  CircleGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  MeshStandardMaterial,
  Color,
  MeshPhongMaterial,
  SphereGeometry,
  ImageLoader,
  CanvasTexture,
  DirectionalLight,
  Camera,
  Renderer,
  BoxGeometry,
  MeshBasicMaterial,
} from "three";
// @ts-ignore
import earthImage from "./static/map.png";

const RADIUS = 0.765 * 0.88;

class MyEarth extends HTMLElement {
  #canvas: HTMLCanvasElement;
  #scene: Scene;
  #sphere: Mesh<SphereGeometry, MeshBasicMaterial>;
  #camera: Camera;
  #renderer: WebGLRenderer;
  #animationID: number | null;
  #counter: number = 0;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.#setup();
  }

  #setup() {
    this.#renderer = new WebGLRenderer({ antialias: true });
    this.#renderer.setSize(400, 400);
    this.#renderer.setPixelRatio(window.devicePixelRatio);

    this.#canvas = this.#renderer.domElement;
    this.shadowRoot?.appendChild(this.#renderer.domElement);

    this.#camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    this.#scene = new Scene();

    const geometryR = new SphereGeometry(1, 64, 64);
    const materialR = new MeshBasicMaterial({ color: "#09C3DB" });
    this.#sphere = new Mesh(geometryR, materialR);

    // this.#scene.add(this.#sphere);

    this.#camera.position.z = 5;

    // const dotGeometry = new SphereGeometry(RADIUS, 64, 64);

    this.#scene.background = new Color(241, 245, 249);

    // let sphere = new Mesh(
    //   dotGeometry,
    //   new MeshPhongMaterial({ color: "#333", wireframe: true })
    // );

    // scene.add(new AmbientLight(0x909090));

    // const light = new DirectionalLight(0x4f4f4f, 1);
    // light.position.set(1, 0, 1);
    // scene.add(light);

    // const geometry = new SphereGeometry(0.5, 32, 32);
    // const material = new MeshPhongMaterial({ color: "#fff", wireframe: true });
    // const earthMesh = new Mesh(geometry, material);
    //
    // this.#scene.add(earthMesh);

    new ImageLoader().load(earthImage, (mapImage) => {
      this.#sphere.material.map = new CanvasTexture(
        mapImage,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8
      );
      this.#sphere.material.map.flipY = false;

      this.#run();
    });

    // Create 60000 tiny dots and spiral them around the sphere.
    const DOT_COUNT = 60000;

    // A hexagon with a radius of 2 pixels looks like a circle
    const dotGeometry = new SphereGeometry(1, 64, 64);

    // The XYZ coordinate of each dot
    const positions = [];

    // A random identifier for each dot
    const rndId = [];

    // The country border each dot falls within
    const countryIds = [];

    const vector = new Vector3();

    for (let i = DOT_COUNT; i >= 0; i--) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

      // Pass the angle between this dot an the Y-axis (phi)
      // Pass this dot’s angle around the y axis (theta)
      // Scale each position by 600 (the radius of the globe)
      vector.setFromSphericalCoords(600, phi, theta);
      dotGeometry.lookAt(vector);

      // Move the dot to the newly calculated position
      dotGeometry.translate(vector.x, vector.y, vector.z);
    }
    const materialtest = new MeshBasicMaterial({ color: "#09C3DB" });

    const test = new Mesh(dotGeometry, materialtest);

    this.#scene.add(this.#sphere);
    this.#scene.add(test);
  }

  #run() {
    this.#animationID = requestAnimationFrame(() => {
      this.#sphere.rotation.x = Math.sin((this.#counter += 0.005)) / 2;
      this.#sphere.rotation.y += 0.005;

      this.#run();
    });

    this.#render();
  }

  #render = () => this.#renderer.render(this.#scene, this.#camera);
}

window.customElements.define("my-earth", MyEarth);
