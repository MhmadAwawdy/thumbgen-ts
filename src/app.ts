import express, { Request, Response, NextFunction } from 'express';
import imageRoutes from './routes/imageRoutes';
import path from 'path';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/fullsize', express.static(path.resolve('./fullsize')));

app.use('/thumbnails', express.static(path.resolve('./thumbnails')));

app.use('/api', imageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Image Processing API is running',
    endpoints: {
      images: '/api/images?filename=<name>&width=<number>&height=<number>',
      fullsize: '/fullsize/<filename>',
      thumbnails: '/thumbnails/<filename>',
    },
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // _next is required for Express error handler signature but not used
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
