# 🚀 Deployment Guide

This guide covers different deployment options for the Flowers Shop fullstack application.

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)
- Git

## 🏠 Local Development

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd flowers-shop

# Install all dependencies
npm run install:all

# Setup database
npm run setup

# Start development servers
npm run dev
```

### Manual Setup
```bash
# Frontend
npm install
npm run dev:frontend

# Backend (in separate terminal)
cd server
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start containers**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8080/api
   - Swagger Docs: http://localhost:8080/api/docs

3. **Stop containers**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

1. **Build backend image**
   ```bash
   cd server
   docker build -t flowers-backend .
   ```

2. **Build frontend image**
   ```bash
   docker build -f Dockerfile.frontend -t flowers-frontend .
   ```

3. **Run containers**
   ```bash
   # Backend
   docker run -d -p 3000:3000 --name backend flowers-backend

   # Frontend
   docker run -d -p 8080:80 --name frontend flowers-frontend
   ```

## ☁️ Cloud Deployment

### Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build:frontend`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com`

#### Backend on Railway
1. Connect GitHub repository to Railway
2. Set root directory: `server`
3. Add environment variables:
   ```
   DATABASE_URL=file:./dev.db
   NODE_ENV=production
   PORT=3000
   ```
4. Deploy automatically on push to main

### Heroku

#### Frontend
1. Create new Heroku app
2. Set buildpack: `heroku/nodejs`
3. Add environment variables
4. Deploy from GitHub

#### Backend
1. Create new Heroku app
2. Add Heroku Postgres addon
3. Set environment variables:
   ```
   DATABASE_URL=<postgres-url>
   NODE_ENV=production
   ```
4. Deploy from GitHub

### DigitalOcean App Platform

1. Create new app from GitHub
2. Add frontend service:
   - Source: `/`
   - Build command: `npm run build:frontend`
   - Output directory: `dist`
3. Add backend service:
   - Source: `/server`
   - Build command: `npm run build`
   - Start command: `npm run start:prod`

## 🔧 Environment Configuration

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.com
VITE_WS_URL=wss://your-backend-url.com
```

### Backend Environment Variables
```env
DATABASE_URL=file:./dev.db
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-frontend-url.com
```

## 🗄️ Database Setup

### SQLite (Development)
```bash
cd server
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### PostgreSQL (Production)
1. Create PostgreSQL database
2. Update DATABASE_URL in environment variables
3. Run migrations:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

## 🔒 Security Considerations

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Use HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Set up monitoring and logging

### SSL/TLS Setup
- Use Let's Encrypt for free SSL certificates
- Configure reverse proxy (nginx) for SSL termination
- Update CORS origins to use HTTPS

## 📊 Monitoring

### Application Monitoring
- Set up error tracking (Sentry)
- Configure application performance monitoring
- Set up uptime monitoring
- Configure log aggregation

### Database Monitoring
- Monitor database performance
- Set up automated backups
- Configure connection pooling
- Monitor disk usage

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions workflow for:
- Automated testing
- Building Docker images
- Pushing to Docker Hub
- Deployment (configurable)

### Setup CI/CD
1. Add Docker Hub credentials to GitHub Secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
2. Configure deployment target
3. Push to main branch to trigger deployment

## 🆘 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check DATABASE_URL format
   - Verify database permissions
   - Ensure database is running

2. **CORS errors**
   - Check CORS configuration
   - Verify frontend URL in CORS origins
   - Check proxy configuration

3. **WebSocket connection issues**
   - Verify WebSocket URL
   - Check firewall settings
   - Ensure WebSocket proxy is configured

4. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Commands
```bash
# Check application logs
docker-compose logs -f

# Check specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Access container shell
docker exec -it flowers_backend sh
docker exec -it flowers_frontend sh
```

## 📈 Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement code splitting
- Optimize images
- Use service workers for caching

### Backend
- Enable database connection pooling
- Implement caching strategies
- Use compression middleware
- Optimize database queries
- Set up load balancing

## 🔄 Backup and Recovery

### Database Backup
```bash
# SQLite backup
cp server/prisma/dev.db backup/dev-$(date +%Y%m%d).db

# PostgreSQL backup
pg_dump $DATABASE_URL > backup/postgres-$(date +%Y%m%d).sql
```

### Application Backup
- Backup uploaded files
- Backup configuration files
- Backup environment variables
- Document deployment procedures

---

**For more detailed information, refer to the main README.md and server/README.md files.**
