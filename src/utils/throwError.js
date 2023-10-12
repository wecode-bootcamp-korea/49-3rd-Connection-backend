const jwt = require("jsonwebtoken");

exports.tokenGeneration = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  return token;
};
/**
 * isValidData
 * @param {string | RegExp} regex - 정규 표현식
 * @param {string} validationTarget - 검증할 문자열
 * @returns
 */
exports.isValidData = (regex, validationTarget) => {
  return regex.test(validationTarget);
};
/**
 * throwError
 * @param {number} code - 에러 상태 코드
 * @param {string} message - 커스텀 하고 싶은 메시지
 * @returns new Error
 */
exports.throwError = (code, message) => {
  if (!code) return;
  const error = new Error();
  let errorMessage = new Map([
    [400, "bad request"],
    [401, "unAuthorized"],
    [500, "internal server error"],
  ]);
  if (!errorMessage.get(code) || message) {
    errorMessage.set(code, message);
  }
  error.message = errorMessage.get(code);
  error.status = code;
  throw error;
};
