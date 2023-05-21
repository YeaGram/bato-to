export function userAgent(req, res, next) {
  const userAgent = req.useragent;
  console.log(userAgent);
  next();
}
