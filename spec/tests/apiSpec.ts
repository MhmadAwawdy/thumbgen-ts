/* eslint-disable prettier/prettier */
import request from 'supertest';
import app from '../../src/app';

describe('GET /api/images', () => {
  it('should return 400 if filename is missing', async () => {
    const response = await request(app).get('/api/images?width=100&height=100');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Filename is required');
  });

  it('should return 400 if width is invalid', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=-5&height=100');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Width must be a positive number');
  });

  it('should return 400 if height is invalid', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=100&height=0');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Height must be a positive number');
  });

  it('should return 500 if the original image does not exist', async () => {
    const response = await request(app).get('/api/images?filename=nonexistent&width=100&height=100');
    expect(response.status).toBe(500);
    expect(response.body.error).toContain('does not exist');
  });

  it('should return 200 and an image for valid request', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=100&height=100');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image/);
  });
});