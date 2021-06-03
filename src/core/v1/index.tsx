console.log("...inner");
import Koa from "koa";
import * as route from "koa-route";

//
console.log("........ss");
const app = new Koa();

function devStream() {
  const about = ctx => {
    ctx.response.type = "html";
    ctx.response.body = '<a href="/">Index Page</a>';
  };

  const main = ctx => {
    ctx.response.body = "Hello World";
  };

  app.use(route.get("/", main));
  app.use(route.get("/about", about));
  app.listen(3000);
}

devStream();
