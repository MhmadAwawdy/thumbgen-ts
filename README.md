# Thumbgen-TS 🖼️

A TypeScript-based Node.js API for generating and caching image thumbnails using Express and Sharp.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Caching Strategy](#caching-strategy)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Image Thumbnail Generation**: Automatically resize images to specified dimensions
- **Intelligent Caching**: Generated thumbnails are cached to disk for improved performance
- **Input Validation**: Comprehensive validation for filename, width, and height parameters
- **Error Handling**: Graceful error responses for missing files and invalid inputs
- **TypeScript Support**: Full TypeScript implementation with proper typing
- **RESTful API**: Clean REST endpoints for image processing
- **Static File Serving**: Direct access to original and processed images
- **Unit Testing**: Comprehensive test suite with Jasmine and SuperTest
- **Code Quality**: ESLint and Prettier integration for consistent code style

## 🔧 Prerequisites

- Node.js >= 16.0.0
- npm or yarn package manager

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd thumbgen-ts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create required directories:**
   ```bash
   mkdir -p fullsize thumbnails
   ```

4. **Add sample images:**
   Place your source images (JPG format) in the `fullsize` directory.
   ```bash
   # Example: Add a sample image
   cp your-image.jpg fullsize/fjord.jpg
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

## 🚀 Usage

### Development Mode
```bash
npm run dev
```
Server will start at `http://localhost:3000` with hot reloading.

### Production Mode
```bash
npm start
```
Runs the compiled JavaScript from the `dist` directory.

### Generate Thumbnails

Make a GET request to the API endpoint:
```
GET /api/images?filename=fjord&width=200&height=200
```

**Example using curl:**
```bash
curl "http://localhost:3000/api/images?filename=fjord&width=200&height=200" --output thumbnail.jpg
```

**Example in browser:**
```
http://localhost:3000/api/images?filename=fjord&width=300&height=200
```

## 🛠 API Endpoints

### Image Processing

#### `GET /api/images`

Generate or retrieve a cached thumbnail.

**Query Parameters:**
- `filename` (required): Name of the image file without extension
- `width` (required): Target width in pixels (1-2000)
- `height` (required): Target height in pixels (1-2000)

**Response:**
- **200 OK**: Returns the processed image
- **400 Bad Request**: Invalid or missing parameters
- **500 Internal Server Error**: Image processing failed or file not found

**Example:**
```bash
GET /api/images?filename=fjord&width=400&height=300
```

### Static File Access

#### `GET /fullsize/<filename>`
Access original images directly.

**Example:**
```
GET /fullsize/fjord.jpg
```

#### `GET /thumbnails/<filename>`
Access generated thumbnails directly.

**Example:**
```
GET /thumbnails/fjord_200x200.jpg
```

### Health Check

#### `GET /`
Returns API status and available endpoints.

**Response:**
```json
{
  "message": "Image Processing API is running",
  "endpoints": {
    "images": "/api/images?filename=<name>&width=<number>&height=<number>",
    "fullsize": "/fullsize/<filename>",
    "thumbnails": "/thumbnails/<filename>"
  }
}
```

## 📁 Project Structure

```
thumbgen-ts/
├── src/                        # TypeScript source code
│   ├── controllers/
│   │   └── imageController.ts  # Request handling logic
│   ├── routes/
│   │   └── imageRoutes.ts      # API route definitions
│   ├── services/
│   │   └── imageService.ts     # Image processing logic
│   ├── utils/
│   │   └── fileUtils.ts        # File utility functions
│   ├── app.ts                  # Express app configuration
│   └── index.ts                # Server entry point
├── spec/                       # Test files
│   ├── tests/
│   │   ├── apiSpec.ts          # API endpoint tests
│   │   └── imageProcessingSpec.ts  # Image processing tests
│   └── helpers/
│       └── ts-node-register.js # TypeScript test configuration
├── dist/                       # Compiled JavaScript (generated)
├── fullsize/                   # Original images
├── thumbnails/                 # Generated thumbnails
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── jasmine.json               # Test configuration
├── eslint.config.js           # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🔧 Development

### Code Quality
The project uses ESLint and Prettier for consistent code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run prettier

# Fix formatting
npm run prettier:fix
```

### TypeScript Configuration
- Strict mode enabled for better type safety
- ES6 target with CommonJS modules
- Source maps generated for debugging

## 🧪 Testing

The project includes comprehensive unit tests covering:
- API endpoint validation
- Image processing functionality  
- Error handling scenarios
- Caching behavior

### Run Tests
```bash
# Run all tests
npm test

# Watch mode (if configured)
npm run test:watch
```

### Test Coverage
- API validation tests (missing parameters, invalid inputs)
- Image processing tests (resize functionality, file operations)
- Error handling tests (non-existent files, processing failures)
- Caching tests (thumbnail reuse, performance)

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run test suite |
| `npm run lint` | Check code linting |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run prettier` | Check code formatting |
| `npm run prettier:fix` | Fix formatting issues automatically |
| `npm run clean` | Remove compiled files |

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port number |
| `NODE_ENV` | `development` | Environment mode |

**Example `.env` file:**
```env
PORT=3000
NODE_ENV=production
```

### Image Processing Settings

- **Maximum dimension**: 2000px (configurable in controller)
- **Output format**: JPEG with 80% quality
- **Resize method**: Cover (maintains aspect ratio, crops if necessary)
- **Position**: Center

## ❌ Error Handling

The API provides detailed error responses for various scenarios:

### 400 Bad Request
```json
{
  "error": "Filename is required"
}
```

```json
{
  "error": "Width must be a positive number"
}
```

```json
{
  "error": "Dimensions cannot exceed 2000px"
}
```

### 500 Internal Server Error
```json
{
  "error": "Original image \"filename.jpg\" does not exist"
}
```

```json
{
  "error": "Error processing the image: [detailed error message]"
}
```

## 💾 Caching Strategy

1. **Cache Check**: Before processing, check if thumbnail already exists
2. **Cache Hit**: If thumbnail exists, serve directly from disk
3. **Cache Miss**: Process image, save to disk, then serve
4. **Cache Location**: `/thumbnails/` directory
5. **Naming Convention**: `{filename}_{width}x{height}.jpg`

**Cache Benefits:**
- Improved response times for repeated requests
- Reduced server load and processing overhead
- Automatic cache management (files persist until manually deleted)

## 🛠 Technologies Used

- **[Node.js](https://nodejs.org/)**: JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)**: Static type checking
- **[Express.js](https://expressjs.com/)**: Web framework
- **[Sharp](https://sharp.pixelplumbing.com/)**: High-performance image processing
- **[Jasmine](https://jasmine.github.io/)**: Testing framework
- **[SuperTest](https://github.com/visionmedia/supertest)**: HTTP assertion library
- **[ESLint](https://eslint.org/)**: Code linting
- **[Prettier](https://prettier.io/)**: Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage for new features
- Use meaningful commit messages
- Ensure all scripts pass before committing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Sharp library for exceptional image processing performance
- Express.js community for robust web framework
- TypeScript team for excellent developer experience

---

**Made with ❤️ by Mohamad Awawdeh