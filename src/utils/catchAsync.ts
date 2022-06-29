const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    return res.status(err?.statusCode).send(err)
  });
};

export default catchAsync;
