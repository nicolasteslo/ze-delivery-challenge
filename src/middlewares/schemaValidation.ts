import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validateBody =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        return res.status(400).json(error.issues);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const validateQuery =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        return res.status(400).json(error.issues);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const validateParams =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        return res.status(400).json(error.issues);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export { validateBody, validateParams, validateQuery };
