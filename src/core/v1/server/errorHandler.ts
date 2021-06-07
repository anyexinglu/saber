const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    // ctx.response.body = {
    //   status: err.statusCode || err.status || 500,
    //   message: err.message,
    // };
    ctx.response.type = "html";
    ctx.response.body = `<p>Something wrong，status: ${ctx.response.status}, message: ${err.message}, please contact administrator.</p>`;
    ctx.app.emit("error", err, ctx);
  }
};

export default errorHandler;
