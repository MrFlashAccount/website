declare module "posthtml-minify-classnames" {
	import PostHTML from "posthtml";

	export interface TOptions {
		filter?: RegExp;
		genNameClass?: false | "genName" | "genNameEmoji" | "genNameEmojiString";
		genNameId?: false | "genName" | "genNameEmoji" | "genNameEmojiString";
		customAttributes?: string[];
		removeUnfound?: boolean;
	}

	declare const plugin: (
		options?: TOptions,
	) => (tree: PostHTML.Node) => Promise<PostHTML.Result<TMessage>>;

	export default plugin;
}
