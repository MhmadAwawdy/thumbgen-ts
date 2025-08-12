import express, { Request, Response, NextFunction } from 'express';
import imageRoutes from './routes/imageRoutes';
import path from 'path';

const app = express();

// Middleware to log requests (optional but helpful)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve full-size images statically at /fullsize (optional, useful if you add upload later)
app.use('/fullsize', express.static(path.resolve('./fullsize')));

// Serve thumbnails statically at /thumbnails (optional)
app.use('/thumbnails', express.static(path.resolve('./thumbnails')));

// Use image routes, mounted at /api
app.use('/api', imageRoutes);

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Generic error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
