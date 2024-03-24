"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
/**
 * Error response middleware for not found
 * @param {Request} req
 * @param {Response} res
 */
const notFound = (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found",
    });
};
exports.notFound = notFound;
/**
 * Generic error response middleware for validation and internal server errors
 *
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    console.log(err);
    res.status(statuscode);
    res.json({
        status: "error",
        message: err === null || err === void 0 ? void 0 : err.message,
    });
};
exports.errorHandler = errorHandler;
