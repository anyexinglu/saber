console.log("...inner");
import Koa from "koa";

const app = new Koa();

function devString() {
  app.use(async ctx => {
    ctx.type = "text/html";
    ctx.status = 200;
    ctx.body = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <script>
        localStorage.setItem('__NOTE_REVEAL_EXTENSION__', true);
        localStorage.setItem('__NOTE_MERCHANT_EXTENSION__', true)
        console.log('...head string')
      </script>
    </head>
    <body>
    string mode
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    
    </body></html>
    `;
  });

  app.listen(4000);
}

devString();
