import { resolve } from "path";

export default function (config, env, helpers) {
    // Switch css-loader for typings-for-css-modules-loader, which is a wrapper
    // that automatically generates .d.ts files for loaded CSS
    helpers.getLoadersByName(config, "css-loader").forEach(({ loader }) => {
        loader.loader = "typings-for-css-modules-loader";
        loader.options = Object.assign(loader.options, {
            camelCase: true,
            banner:
                "// This file is automatically generated from your CSS. Any edits will be overwritten.",
            namedExport: true,
            silent: true
        });
    });

    config.module.loaders.push({
        test: /\.[tj]sx?$/,
        loader: "ts-loader"
    });

    // Use any `index` file, not just index.js
    config.resolve.alias["preact-cli-entrypoint"] = resolve(
        process.cwd(),
        "src",
        "index"
    );

    config.devServer.proxy = [
        {
            path: '/forecast',
            target: 'http://localhost:8081',
            secure: false,
        }
    ];

    return config;
}
