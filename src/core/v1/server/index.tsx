console.log("...inner");
import Koa from "koa";
// 很简单，就是正则命中 path：https://github.com/koajs/route/blob/master/index.js
// 和 cv 最主要的区别是，后者统一走 render 作为 reqHandler。
import * as route from "koa-route";
import favicon from "./helper/favicon";
import errorHandler from "./errorHandler";
import * as React from "react";
import * as reactDom from "react-dom/server";
import Document from "./template/Document";
import hmr from "./hmr";
import { appRoot, CLIENT_DIR } from "./constants";
// import * as serve from "koa-static";

const { renderToString } = reactDom;
const app = new Koa();
// const root = path.join(__dirname);

const main = ctx => {
  // ctx.throw(500);
  const { path } = ctx;
  const regex = new RegExp(`^/([0-9a-zA-Z_-]+)`);
  console.log("...ctx", path);
  // if (["/favicon.ico"].includes(path)) {
  //   return serve(root);
  // }

  const match = path.match(regex);
  console.log("...match", path, match);
  const view = match?.[1];

  let Page;
  try {
    Page = require(CLIENT_DIR + `/views/${view}`).default;
  } catch (e) {
    // Error: Cannot find module './views/12'
    console.log("...e", e);
    Page = require(CLIENT_DIR + `/views/404`).default;
  }

  const html = renderToString(
    React.createElement(Document, { children: React.createElement(Page) })
  );
  ctx.response.body = html;
  ctx.response.type = "html";
};

let runningApp;

function serve(options) {
  console.log("...options", options);
  app.use(favicon(appRoot + "/static/favicon.ico"));

  app.use(route.get("*", main));

  app.use(errorHandler);
  app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
  });

  app.listen(3000);
  console.log("...app", app);
  return app;
}

function start(options) {
  runningApp?.close?.();
  runningApp = serve(options);
}

function run() {
  start({});
  hmr(start);
}

run();