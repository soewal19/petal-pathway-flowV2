# 🌱 Database Seeding Guide

This guide explains how to use the database seeding functionality for the Flowers Shop application.

## 📋 Overview

The application includes comprehensive database seeding that automatically populates the SQLite database with:

- **3 Flower Shops** with location data
- **15 Different Flowers** across all shops
- **6 Coupons** (5 active, 1 expired)
- **3 Sample Orders** with order items

## 🚀 Quick Start

### Automatic Seeding (Recommended)

The database is automatically seeded when you start the server for the first time:

```bash
# Install dependencies and setup database
npm run setup

# Start development servers
npm run dev
```

The server will automatically detect if the database is empty and run the seed script.

### Manual Seeding

If you need to manually seed the database:

```bash
# Seed the database
npm run db:seed

# Or from the server directory
cd server
npm run prisma:seed
```

## 🔄 Database Management Commands

### Reset Database
```bash
# Reset database and reseed
npm run db:reset

# Or from server directory
cd server
npm run prisma:reset
```

### Generate Prisma Client
```bash
cd server
npm run prisma:generate
```

### Run Migrations
```bash
cd server
npm run prisma:migrate
```

## 📊 Seeded Data

### Shops (3)
1. **Flowery Fragrant** - 123 Garden Street, Bloomville
2. **Bloomwell** - 456 Rose Avenue, Petalton  
3. **Petals Paradise** - 789 Flower Road, Gardenville

### Flowers (15)
Each shop has 5 different flowers with varying prices:

**Flowery Fragrant:**
- Red Rose Bouquet ($25.99)
- White Lily Elegance ($32.99)
- Premium Rose Collection ($45.99)
- Wild Daisy Bunch ($19.99)
- Dutch Tulip Premium ($35.99)

**Bloomwell:**
- Spring Tulip Mix ($18.99)
- Cheerful Daisy Collection ($22.99)
- White Lily Premium ($38.99)
- Red Rose Classic ($29.99)
- Mixed Spring Bouquet ($24.99)

**Petals Paradise:**
- Garden Rose Deluxe ($55.99)
- Oriental Lily Bouquet ($42.99)
- English Daisy Bunch ($24.99)
- Rainbow Tulip Collection ($31.99)
- Luxury Rose Arrangement ($65.99)

### Coupons (6)
- **WELCOME10** - 10% off first order (Active)
- **SPRING20** - 20% off spring collection (Active)
- **PREMIUM15** - 15% off for premium customers (Active)
- **VALENTINE25** - 25% off romantic flowers (Active)
- **BIRTHDAY30** - 30% off birthday arrangements (Active)
- **EXPIRED50** - 50% off (Inactive)

### Sample Orders (3)
- **John Doe** - 2x Red Rose Bouquet with WELCOME10 coupon
- **Jane Smith** - Spring Tulip Mix + Cheerful Daisy Collection
- **Mike Johnson** - Garden Rose Deluxe + Oriental Lily Bouquet

## 🛠️ Customization

### Adding More Data

To add more seed data, edit `server/scripts/seed.ts`:

```typescript
// Add more shops
const additionalShops = await Promise.all([
  prisma.shop.create({
    data: {
      name: 'New Shop',
      location: 'New Location',
      address: 'New Address',
      phone: '+1 (555) 000-0000',
      hours: '9:00 AM - 6:00 PM',
      latitude: 30.5000,
      longitude: 50.5000,
    },
  }),
]);

// Add more flowers
const additionalFlowers = await Promise.all([
  prisma.flower.create({
    data: {
      name: 'New Flower',
      price: 29.99,
      image: '/images/new-flower.jpg',
      description: 'A beautiful new flower',
      shopId: additionalShops[0].id,
    },
  }),
]);
```

### Modifying Existing Data

To modify the seeded data, update the values in `server/scripts/seed.ts` and run:

```bash
npm run db:reset
```

## 🔍 Verification

### Check Seeded Data

You can verify the seeded data by:

1. **Using the API:**
   ```bash
   # Get all shops
   curl http://localhost:3000/shops
   
   # Get all flowers
   curl http://localhost:3000/flowers
   
   # Get all orders
   curl http://localhost:3000/orders
   ```

2. **Using Swagger UI:**
   Visit `http://localhost:3000/api/docs` and test the endpoints

3. **Using the Frontend:**
   Visit `http://localhost:5173/shop` to see all flowers
   Visit `http://localhost:5173/admin/flowers` to manage flowers

### Database File Location

The SQLite database file is located at:
```
server/prisma/dev.db
```

## 🚨 Troubleshooting

### Common Issues

1. **"Database already has data" message**
   - This is normal if the database was already seeded
   - Use `npm run db:reset` to reset and reseed

2. **Prisma client not generated**
   ```bash
   cd server
   npm run prisma:generate
   ```

3. **Migration errors**
   ```bash
   cd server
   npm run prisma:migrate
   ```

4. **Permission errors on Windows**
   - Run terminal as Administrator
   - Check file permissions on the database file

### Reset Everything

If you encounter persistent issues:

```bash
# Delete database and start fresh
cd server
rm prisma/dev.db
npm run db:seed
```

## 📝 Notes

- The seed script checks if data already exists to prevent duplicates
- All seeded data uses realistic pricing and descriptions
- Images reference existing assets in the frontend
- Orders include proper relationships with shops, flowers, and coupons
- The database is automatically seeded on first server startup

---

**For more information, check the main README.md and server/README.md files.**
