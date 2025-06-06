import { Application, Request, Response, NextFunction } from "express";

export default (app: Application) => {
  // Handle 404 - Route not found
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message:
        "This route does not exist, you should probably look at your URL or what your backend is expecting",
    });
  });

  // Error handling middleware
  app.use(
    (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction // still need this parameter to identify error middleware
    ) => {
      console.error("ERROR", req.method, req.path, err);

      if (!res.headersSent) {
        res.status(500).json({
          message: "Internal server error. Check the server console",
        });
      } else {
        next(err);
      }
    }
  );
};