export function props(req, res, next) {
  const reqQuery = req.query;
  console.log(reqQuery);

  next();
}
export function userAgent(req, res, next) {
  const userAgent = req.useragent;
  console.log(userAgent);
  next();
}
