console.log("...inner");
import Koa from "koa";

// 很简单，就是正则命中 path：https://github.com/koajs/route/blob/master/index.js
// 和 cv 最主要的区别是，后者统一走 render 作为 reqHandler。
import * as route from "koa-route";
import errorHandler from "./errorHandler";

const app = new Koa();

const about = ctx => {
  // 抛出错误
  ctx.throw(500);
  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = "Hello World";
};

app.use(route.get("/", main));
app.use(errorHandler);
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
app.use(route.get("/about", about));

app.listen(3000);
