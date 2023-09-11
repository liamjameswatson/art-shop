// fucntion that takes in req, res, and next. It will reslove the promise and call next which will continue to the next middleware.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
