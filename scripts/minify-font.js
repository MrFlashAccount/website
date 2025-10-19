import Fontmin from "fontmin";
import fg from "fast-glob";
import rename from "gulp-rename";
import { join, parse } from "node:path";

/**
 * @typedef {{
 *   src: string,
 *   dest: string,
 * }} MinifyFontOptions - Options for minifyFont
 * @param letters {string}
 * @param options {MinifyFontOptions}
 * @return {Promise<Buffer>}
 */
export async function minifyFont(letters, options) {
	return new Promise((resolve, reject) => {
		const { src, dest } = options;

		new Fontmin()
			.src(src)
			.dest(dest)
			.use(Fontmin.otf2ttf())
			.use(Fontmin.glyph({ text: letters + "20567", hinting: false }))
			.use(Fontmin.ttf2woff2())
			.use(
				rename((path) => {
					const rootDir = join(`${src}/`, "../");

					if (path.extname === ".woff2") {
						const nameWithoutHash = path.basename
							.split(".")
							.slice(0, -1)
							.join(".");

						const files = fg.sync(
							join(rootDir, `${nameWithoutHash}.*${path.extname}`),
						);

						if (files.length > 1) {
							throw new Error(
								`More than one file found for ${nameWithoutHash}.*${path.extname}: ${files.join(", ")}!`,
							);
						}

						path.basename = parse(files[0]).name;
					}

					return path;
				}),
			)
			.run((err, files) => {
				if (err) {
					reject(err);
				}

				return resolve(files[0]);
			});
	});
}
