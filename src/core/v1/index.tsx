console.log("...inner");
import Koa from "koa";

// 很简单，就是正则命中 path：https://github.com/koajs/route/blob/master/index.js
// 和 cv 最主要的区别是，后者统一走 render 作为 reqHandler。
import * as route from "koa-route";
// import favicon from "./helper/favicon";
// import * as path from "path";
import errorHandler from "./errorHandler";
import * as React from "react";
import * as reactDom from "react-dom/server";
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
    Page = require(`./views/${view}`).default;
  } catch (e) {
    // Error: Cannot find module './views/12'
    console.log("...e", e);
    Page = require(`./views/404`).default;
  }

  const application = renderToString(React.createElement(Page));
  let html = `<!doctype html>
  <html class="no-js" lang="">
      <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>HMR all the things!</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
          <div id="root">${application}</div>
          xxx
      </body>
  </html>`;
  ctx.response.body = html;
  ctx.response.type = "html";
};

// 奇怪自己就没有 favicon.ico 的报错了
// const appRoot = path.resolve(
//   path.dirname(require.resolve("koa")),
//   "..",
//   "..",
//   ".."
// );

// app.use(favicon(appRoot + "/static/favicon.ico"));

app.use(route.get("*", main));

app.use(errorHandler);
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen(3000);
