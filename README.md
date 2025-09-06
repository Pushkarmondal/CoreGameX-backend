# CoreGameX Backend

CoreGameX is a marketplace for game assets where creators can publish and sell their 3D models, textures, and other game development assets, and gamers/developers can discover and purchase them.

## 🚀 Features

- **User Authentication & Authorization**
  - Email/Password signup & login
  - JWT-based authentication
  - Role-based access control (Gamer/Creator)
  - Profile management

- **Asset Management**
  - Upload and publish game assets
  - Asset versioning
  - Asset categorization and tagging
  - Thumbnail and preview generation

- **Marketplace**
  - Advanced search and filtering
  - Asset discovery
  - Wishlist functionality
  - Asset ratings and reviews

- **E-commerce**
  - Shopping cart
  - Secure checkout (mock payments for MVP)
  - Purchase history
  - Download management

- **Creator Tools**
  - Sales analytics
  - Asset management dashboard
  - Earnings tracking

## 🛠️ Tech Stack

- **Runtime**: Bun (v1.2.17+)
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **File Storage**: Local filesystem (MVP)
- **Validation**: Zod
- **Real-time**: WebSockets (for future features)

## 📦 Prerequisites

- Node.js v18+
- Bun v1.2.17+
- PostgreSQL 14+

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/coregamex-backend.git
cd coregamex-backend/backend
```

### 2. Install dependencies
```bash
bun install
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory:
```env
# App
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/coregamex?schema=public"

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=30d

# File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800 # 50MB
```

### 4. Set up the database
```bash
# Run database migrations
bun prisma migrate dev

# Seed initial data (optional)
bun prisma db seed
```

### 5. Start the development server
```bash
bun run dev
```

The server will start at `http://localhost:<PORT>`

## 📚 API Documentation

For detailed API documentation, please refer to [API_DOCS.md](./API_DOCS.md) or explore the interactive API documentation at `http://localhost:<PORT>/api-docs` when the server is running.

## 🧪 Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models (Prisma)
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── validations/    # Request validations
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server initialization
├── prisma/             # Prisma schema and migrations
├── uploads/            # File uploads (created at runtime)
├── tests/              # Test files
├── .env                # Environment variables
├── .gitignore
├── bun.lockb
├── package.json
└── tsconfig.json
```

## 🔒 Security

- Input validation using Zod
- Rate limiting
- Helmet for security headers
- CORS configuration
- Request sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Zod](https://zod.dev/) - TypeScript-first schema validation

<div align="center">
  Made with ❤️ by the CoreGameX Team
</div>
