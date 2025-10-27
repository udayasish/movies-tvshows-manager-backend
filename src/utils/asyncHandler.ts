import { Request, Response, NextFunction } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = (requestHandler: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: any) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};

export { asyncHandler };
