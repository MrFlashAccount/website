/// <reference types="@astrojs/image/client" />

declare module '*.png?url' {
    const url: string;
    export default url;
}
