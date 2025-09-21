# 🌸 Flowers Shop - Fullstack Application

A modern fullstack flowers shop application built with React, NestJS, Prisma ORM, SQLite3, and WebSockets for real-time updates.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **State Management**: Zustand for efficient state management
- **Real-time Updates**: WebSocket integration for live data synchronization
- **Responsive Design**: Mobile-first responsive design
- **Shopping Cart**: Full cart functionality with persistence
- **Favorites**: Save favorite flowers
- **Order History**: Track order history
- **Admin Panel**: Manage flowers with real-time updates

### Backend (NestJS + Prisma)
- **REST API**: Complete CRUD operations for flowers, shops, and orders
- **WebSocket Support**: Real-time communication with Socket.IO
- **Database**: SQLite3 with Prisma ORM
- **Swagger Documentation**: Interactive API documentation
- **Validation**: Request validation with class-validator
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Zustand** - State management
- **Socket.IO Client** - WebSocket communication
- **React Router** - Navigation
- **React Query** - Data fetching

### Backend
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **SQLite3** - Database
- **Socket.IO** - WebSocket server
- **Swagger** - API documentation
- **class-validator** - Validation
- **TypeScript** - Type safety

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flowers-shop
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup database**
   ```bash
   npm run setup
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs

## 🗂️ Project Structure

```
flowers-shop/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   └── FlowerManagement.tsx # Admin panel
│   ├── pages/                   # Page components
│   ├── store/                   # Zustand stores
│   ├── hooks/                   # Custom hooks
│   ├── context/                 # React contexts
│   └── types/                   # TypeScript types
├── server/                      # Backend source code
│   ├── src/
│   │   ├── flowers/             # Flowers module
│   │   ├── shops/               # Shops module
│   │   ├── orders/              # Orders module
│   │   ├── prisma/              # Prisma service
│   │   └── main.ts              # Application entry
│   └── prisma/
│       ├── schema.prisma        # Database schema
│       └── seed.ts              # Database seeding
└── package.json                 # Root package.json
```

## 🔌 API Endpoints

### Flowers
- `GET /flowers` - Get all flowers
- `GET /flowers/:id` - Get flower by ID
- `GET /flowers/shop/:shopId` - Get flowers by shop
- `POST /flowers` - Create new flower
- `PATCH /flowers/:id` - Update flower
- `DELETE /flowers/:id` - Delete flower

### Shops
- `GET /shops` - Get all shops
- `GET /shops/:id` - Get shop by ID
- `POST /shops` - Create new shop
- `PATCH /shops/:id` - Update shop
- `DELETE /shops/:id` - Delete shop

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `GET /orders/customer/:email` - Get orders by customer
- `GET /orders/shop/:shopId` - Get orders by shop
- `POST /orders` - Create new order

## 🔄 WebSocket Events

### Client to Server
- `flowers:create` - Create new flower
- `flowers:update` - Update flower
- `flowers:delete` - Delete flower
- `flowers:refresh` - Refresh flowers list

### Server to Client
- `flowers:init` - Initial flowers data
- `flowers:created` - New flower created
- `flowers:updated` - Flower updated
- `flowers:deleted` - Flower deleted
- `flowers:refreshed` - Flowers list refreshed

## 🎯 Usage

### Frontend Development
```bash
# Start only frontend
npm run dev:frontend

# Build frontend
npm run build:frontend
```

### Backend Development
```bash
# Start only backend
npm run dev:backend

# Build backend
npm run build:backend

# Database operations
cd server
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
```

### Production
```bash
# Build everything
npm run build

# Start production servers
npm run start
```

## 🗄️ Database Schema

The application uses SQLite3 with the following main entities:

- **Shops**: Flower shop information with location data
- **Flowers**: Flower products with pricing and descriptions
- **Orders**: Customer orders with items and payment info
- **OrderItems**: Individual items within orders
- **Coupons**: Discount coupons for orders

## 🔧 Configuration

### Environment Variables

Create `.env` file in the server directory:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:3000` for API calls and WebSocket connections.

## 🚀 Deployment

### Docker (Optional)
```bash
# Build Docker images
docker-compose build

# Start containers
docker-compose up -d
```

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder (frontend) and `server/dist` folder (backend)
3. Set up environment variables
4. Run database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Swagger documentation at `/api/docs`
- Review the WebSocket events documentation above

---

**Happy coding! 🌸**