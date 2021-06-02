console.log("...inner");
import Koa from "koa";

// import { Readable } from "stream";
// import * as Stream from "stream";

// async function* generate() {
//   yield "hello";
//   yield "streams";
// }

// https://nodejs.org/api/stream.html#stream_stream_readable_from_iterable_options
// const readable = Readable.from([
//   '<!DOCTYPE html><html lang="zh-CN">',
//   `<head></head>`,
//   `<body>1111</body></html>`,
// ]);

// readable.on("data", chunk => {
//   console.log(chunk);
// });

const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(3000);
