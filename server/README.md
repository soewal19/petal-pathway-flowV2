# 🌸 Flowers Shop Backend

NestJS backend application with Prisma ORM, SQLite3 database, and WebSocket support for real-time communication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

3. **Start development server**
   ```bash
   npm run start:dev
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/api/docs` for interactive Swagger documentation.

## 🗄️ Database

### Schema Overview

The application uses SQLite3 with Prisma ORM. Main entities:

- **Shop**: Flower shop information with location data
- **Flower**: Flower products with pricing and descriptions  
- **Order**: Customer orders with items and payment info
- **OrderItem**: Individual items within orders
- **Coupon**: Discount coupons for orders

### Database Operations

```bash
# Generate Prisma client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Reset database
npm run prisma:reset
```

## 🔌 WebSocket Events

### Server Events (emitted to clients)

- `flowers:init` - Send initial flowers data to new client
- `flowers:created` - Broadcast new flower creation
- `flowers:updated` - Broadcast flower update
- `flowers:deleted` - Broadcast flower deletion
- `flowers:refreshed` - Broadcast refreshed flowers list

### Client Events (received from clients)

- `flowers:create` - Create new flower
- `flowers:update` - Update existing flower
- `flowers:delete` - Delete flower
- `flowers:refresh` - Refresh flowers list

## 🛠️ Development

### Project Structure

```
src/
├── flowers/              # Flowers module
│   ├── dto/             # Data Transfer Objects
│   ├── flowers.controller.ts
│   ├── flowers.service.ts
│   ├── flowers.gateway.ts
│   └── flowers.module.ts
├── shops/               # Shops module
├── orders/              # Orders module
├── prisma/              # Prisma service
└── main.ts              # Application entry point
```

### Adding New Features

1. **Create module**
   ```bash
   nest g module feature-name
   nest g service feature-name
   nest g controller feature-name
   ```

2. **Add to app.module.ts**
   ```typescript
   imports: [
     // ... other modules
     FeatureNameModule,
   ],
   ```

3. **Update Prisma schema** if needed
4. **Run migrations**
5. **Add WebSocket events** if real-time updates needed

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

### CORS Configuration

The server is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Production frontend)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start debug server
- `npm run build` - Build application
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 Production Deployment

1. **Build application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start:prod
   ```

3. **Environment setup**
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set up proper CORS origins

## 🔒 Security Considerations

- Input validation with class-validator
- CORS configuration
- SQL injection protection via Prisma
- Rate limiting (can be added with @nestjs/throttler)

## 📈 Performance

- Prisma connection pooling
- Efficient database queries
- WebSocket connection management
- Caching strategies (can be added)

## 🆘 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check DATABASE_URL in .env
   - Ensure SQLite file permissions
   - Run `npm run prisma:generate`

2. **WebSocket connection issues**
   - Check CORS configuration
   - Verify client connection URL
   - Check firewall settings

3. **Build errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

### Debug Mode

Start server in debug mode:
```bash
npm run start:debug
```

Then attach debugger to port 9229.

---

**For more information, check the main README.md file.**