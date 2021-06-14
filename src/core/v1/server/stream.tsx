console.log("...inner");
import Koa from "koa";
import * as stream from "stream";
import debug from "debug";

const { Readable } = stream;

//
console.log("........ss");
const app = new Koa();

function devStream() {
  app.use(async ctx => {
    // https://nodejs.org/api/stream.html#stream_stream_readable_from_iterable_options
    const result = Readable.from([
      '<!DOCTYPE html><html lang="zh-CN">',
      `<head>
        <script>
          localStorage.setItem('__NOTE_REVEAL_EXTENSION__', true);
          localStorage.setItem('__NOTE_MERCHANT_EXTENSION__', true)
          console.log('...head stream')
        </script>
      </head>`,
      `<body>stream mode
      
    <div>33</div>
      </body></html>`,
    ]);

    result.on("data", chunk => {
      console.log(chunk);
    });

    result.on("error", function errorStream(err: Error) {
      console.error(err, "render stream unknown error, url: " + ctx.url);
      debug(err, "render stream unknown error, url: " + ctx.url);
    });

    result.on("end", function endStream() {
      debug("stream end");
    });

    result.on("close", function endStream() {
      debug("stream end");
    });

    console.log("...result", result);

    ctx.type = "text/html";
    ctx.status = 200;
    if (result instanceof stream.Stream) {
      ctx.set("X-Accel-Buffering", "no");
    }
    ctx.body = result;
  });

  app.listen(4000);
}

devStream();
