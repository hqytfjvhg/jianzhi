const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  configureWebpack: {
    // Webpack 配置选项
    // devtool: "none", // 禁用源映射
    devServer: {
      client: {
        overlay: false,
      },
      // overlay: false, // 禁用错误弹出到浏览器页面
      port: 8085,
      host: "0.0.0.0",
      https: false,
      open: true,

      // client: {
      //   WebSocketURL: "ws://192.168.1.189:8080/ws",
      // },
      //允许访问的域名
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          // http://120.78.238.125:8888/
          // 192.168.1.148:8989
          // target: "http://175.178.131.223:7529",
          target: "http://127.0.0.1:7529",
          // target: "http://120.78.140.246:7529",
          changeOrigin: true,
          // secure: false, // 当代理某些https服务报错时用
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
});
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
chainWebpack: (config) => {
  config.resolve.symlinks(true); // 修复热更新失效
  config.resolve.alias.set("@", resolve("src"));
  config.performance.set("hints", false);
  config.plugin("xcCache").use(HardSourceWebpackPlugin); //提升编译速度  不能跟speed-measure-webpack-plugin同时使用
  //config.plugin("xcTime").use(SpeedMeasurePlugin);  //然后我们配置到chainwebpack中
  config.output.filename("[name].[hash].js").end();
  if (IS_PROD) {
    config.optimization.delete("splitChunks");
  }
  return config;
};
