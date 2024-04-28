import { Request, Response } from "express";

const withErrorHandling = (
  handler: (req: Request, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error.",
      });
    }
  };
};

export { withErrorHandling };
