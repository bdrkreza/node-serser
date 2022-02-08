const errorHandler = (error, res) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
};

//Error Handler route
const notFoutRoute = (req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoutRoute
};
