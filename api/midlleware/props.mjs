export function props(req, res, next) {
  const reqQuery = req.query;
  console.log(reqQuery);

  next();
}
