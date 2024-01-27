/// <reference types="@astrojs/image/client" />

declare module "*.png?url" {
	const url: string;
	export default url;
}

declare module "*.webp?url" {
	const url: string;
	export default url;
}

declare module "*.glsl?raw" {
	const content: string;
	export default content;
}
