console.log("...inner");
import Koa from "koa";

// 很简单，就是正则命中 path：https://github.com/koajs/route/blob/master/index.js
// 和 cv 最主要的区别是，后者统一走 render 作为 reqHandler。
import * as route from "koa-route";
import errorHandler from "./errorHandler";
import * as React from "react";
import * as reactDom from "react-dom/server";

const { renderToString } = reactDom;

const app = new Koa();

const main = ctx => {
  // ctx.throw(500);
  const { path } = ctx;
  const regex = new RegExp(`^/([0-9a-zA-Z_-]+)`);
  const match = path.match(regex);
  console.log("...ctx", path, match);
  const view = match?.[1];

  let Page;
  try {
    Page = require(`./views/${view}`).default;
  } catch (e) {
    // Error: Cannot find module './views/12'
    console.log("...e", e);
    Page = require(`./views/404`).default;
  }

  console.log("...result", Page, React.createElement(Page));
  ctx.response.body = renderToString(React.createElement(Page));
  ctx.response.type = "html";
};

app.use(route.get("*", main));

app.use(errorHandler);
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen(3000);
