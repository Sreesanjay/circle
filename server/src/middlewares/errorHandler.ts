import { Response, Request, NextFunction } from "express";

/**
 * Error response middleware for not found
 * @param {Request} req
 * @param {Response} res
 */
export const notFound = (req: Request, res: Response) => {
     return res.status(404).json({
          status: "error",
          message: "Not Found",
     });
};

/**
 * Generic error response middleware for validation and internal server errors
 *
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response,next: NextFunction) => {
     const statuscode: number = res.statusCode == 200 ? 500 : res.statusCode;
     console.log(err)
     res.status(statuscode);
     res.json({
          status: "error",
          message: err?.message,
     });
};
