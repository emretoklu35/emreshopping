# Backend for emreshopping

This is the backend server for emreshopping application.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Deployment

When deploying this application:

1. Set the environment variable `NODE_ENV=production` to enable production mode
2. Set the `PORT` environment variable if you want to use a different port
3. Make sure the `public/images` directory is included in your deployment
4. The application will automatically use the correct URLs for images in production

## Structure

- `server.js`: Main server file
- `public/images/`: Directory containing all product images
- `data/`: Contains the SQLite database

## Image Handling

Images are served from the `public/images` directory. In development, they use localhost URLs, but in production, they'll use the deployed server's domain automatically. 