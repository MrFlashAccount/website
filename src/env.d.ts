/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module "*.jxl" {
	const metadata: ImageMetadata;
	export default metadata;
}
