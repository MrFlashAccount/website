module.exports = () => {
	let plugins = [];

	if (process.env.NODE_ENV === "production") {
		plugins.push(require("postcss-variable-compress"));
	}

	return { plugins };
};
