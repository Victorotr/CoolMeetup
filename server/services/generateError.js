export const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};
