module.exports = () => {
	const plugins = [require("tailwindcss")];

	if (process.env.NODE_ENV === "production") {
		plugins.push(require("postcss-variable-compress"));
	}

	return { plugins };
};
