const injectHmr = async (ctx, next) => {
  console.log("...injectHmr", ctx.path);
  return next();
};

export default injectHmr;
