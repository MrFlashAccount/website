declare module "*.module.scss" {
  const styles: any;
  module.exports = {} as Record<string, string>;
}

declare module "*.css" {
  const styles: any;
  module.exports = {} as Record<string, string>;
}
