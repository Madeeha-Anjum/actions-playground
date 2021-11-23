import ApiError from "./ApiError.js";

export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).send({
      message: err.message,
      code: err.code,
    });

    return;
  }

  res.status(500).send({ message: "Something went wrong!", code: 500 });
}
