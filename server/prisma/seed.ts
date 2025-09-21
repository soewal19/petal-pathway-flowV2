import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Check if data already exists
  const existingShops = await prisma.shop.count();
  if (existingShops > 0) {
    console.log('✅ Database already has data, skipping seed.');
    return;
  }

  // Create shops
  const shops = await Promise.all([
    prisma.shop.create({
      data: {
        name: 'Flowery Fragrant',
        location: '123 Garden Street, Bloomville',
        address: '123 Garden Street, Bloomville',
        phone: '+1 (555) 123-4567',
        hours: '9:00 AM - 8:00 PM',
        latitude: 30.5234,
        longitude: 50.4501,
      },
    }),
    prisma.shop.create({
      data: {
        name: 'Bloomwell',
        location: '456 Rose Avenue, Petalton',
        address: '456 Rose Avenue, Petalton',
        phone: '+1 (555) 234-5678',
        hours: '8:00 AM - 9:00 PM',
        latitude: 30.5434,
        longitude: 50.4601,
      },
    }),
    prisma.shop.create({
      data: {
        name: 'Petals Paradise',
        location: '789 Flower Road, Gardenville',
        address: '789 Flower Road, Gardenville',
        phone: '+1 (555) 345-6789',
        hours: '10:00 AM - 7:00 PM',
        latitude: 30.5034,
        longitude: 50.4401,
      },
    }),
  ]);

  console.log(`✅ Created ${shops.length} shops`);

  // Create flowers
  const flowers = await Promise.all([
    // Flowery Fragrant flowers
    prisma.flower.create({
      data: {
        name: 'Red Rose Bouquet',
        price: 25.99,
        image: '/images/rose-bouquet.jpg',
        description: 'Beautiful red roses perfect for any romantic occasion',
        shopId: shops[0].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'White Lily Elegance',
        price: 32.99,
        image: '/images/lily-bouquet.jpg',
        description: 'Elegant white lilies symbolizing purity and rebirth',
        shopId: shops[0].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Premium Rose Collection',
        price: 45.99,
        image: '/images/rose-bouquet.jpg',
        description: 'Premium collection of the finest roses',
        shopId: shops[0].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Wild Daisy Bunch',
        price: 19.99,
        image: '/images/daisy-bouquet.jpg',
        description: 'Wild daisies perfect for casual occasions',
        shopId: shops[0].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Dutch Tulip Premium',
        price: 35.99,
        image: '/images/tulip-bouquet.jpg',
        description: 'Premium Dutch tulips imported fresh',
        shopId: shops[0].id,
      },
    }),

    // Bloomwell flowers
    prisma.flower.create({
      data: {
        name: 'Spring Tulip Mix',
        price: 18.99,
        image: '/images/tulip-bouquet.jpg',
        description: 'Vibrant spring tulips to brighten any space',
        shopId: shops[1].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Cheerful Daisy Collection',
        price: 22.99,
        image: '/images/daisy-bouquet.jpg',
        description: 'Cheerful daisies bringing joy and innocence',
        shopId: shops[1].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'White Lily Premium',
        price: 38.99,
        image: '/images/lily-bouquet.jpg',
        description: 'Premium white lilies for special occasions',
        shopId: shops[1].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Red Rose Classic',
        price: 29.99,
        image: '/images/rose-bouquet.jpg',
        description: 'Classic red roses for timeless romance',
        shopId: shops[1].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Mixed Spring Bouquet',
        price: 24.99,
        image: '/images/tulip-bouquet.jpg',
        description: 'Beautiful mix of spring flowers',
        shopId: shops[1].id,
      },
    }),

    // Petals Paradise flowers
    prisma.flower.create({
      data: {
        name: 'Garden Rose Deluxe',
        price: 55.99,
        image: '/images/rose-bouquet.jpg',
        description: 'Exquisite garden roses for special celebrations',
        shopId: shops[2].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Oriental Lily Bouquet',
        price: 42.99,
        image: '/images/lily-bouquet.jpg',
        description: 'Fragrant oriental lilies with stunning beauty',
        shopId: shops[2].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'English Daisy Bunch',
        price: 24.99,
        image: '/images/daisy-bouquet.jpg',
        description: 'Charming English daisies in a rustic bunch',
        shopId: shops[2].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Rainbow Tulip Collection',
        price: 31.99,
        image: '/images/tulip-bouquet.jpg',
        description: 'Stunning rainbow tulips in multiple colors',
        shopId: shops[2].id,
      },
    }),
    prisma.flower.create({
      data: {
        name: 'Luxury Rose Arrangement',
        price: 65.99,
        image: '/images/rose-bouquet.jpg',
        description: 'Luxury rose arrangement for special events',
        shopId: shops[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${flowers.length} flowers`);

  // Create coupons
  const coupons = await Promise.all([
    prisma.coupon.create({
      data: {
        name: 'Welcome Discount',
        code: 'WELCOME10',
        discount: 10.0,
        description: '10% off your first order',
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        name: 'Spring Sale',
        code: 'SPRING20',
        discount: 20.0,
        description: '20% off spring collection',
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        name: 'Premium Customer',
        code: 'PREMIUM15',
        discount: 15.0,
        description: '15% off for premium customers',
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        name: 'Valentine Special',
        code: 'VALENTINE25',
        discount: 25.0,
        description: '25% off romantic flowers',
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        name: 'Birthday Bonus',
        code: 'BIRTHDAY30',
        discount: 30.0,
        description: '30% off birthday arrangements',
        isActive: true,
      },
    }),
    prisma.coupon.create({
      data: {
        name: 'Expired Coupon',
        code: 'EXPIRED50',
        discount: 50.0,
        description: 'This coupon is no longer valid',
        isActive: false,
      },
    }),
  ]);

  console.log(`✅ Created ${coupons.length} coupons`);

  // Create sample orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1 (555) 123-4567',
        customerAddress: '123 Main Street, Anytown, USA',
        total: 51.98,
        originalTotal: 60.00,
        discountAmount: 8.02,
        shopId: shops[0].id,
        couponId: coupons[0].id,
        orderItems: {
          create: [
            {
              flowerId: flowers[0].id,
              quantity: 2,
              price: 25.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        customerPhone: '+1 (555) 987-6543',
        customerAddress: '456 Oak Avenue, Somewhere, USA',
        total: 42.99,
        shopId: shops[1].id,
        orderItems: {
          create: [
            {
              flowerId: flowers[5].id,
              quantity: 1,
              price: 18.99,
            },
            {
              flowerId: flowers[6].id,
              quantity: 1,
              price: 22.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        customerName: 'Mike Johnson',
        customerEmail: 'mike.johnson@example.com',
        customerPhone: '+1 (555) 456-7890',
        customerAddress: '789 Pine Road, Elsewhere, USA',
        total: 98.98,
        originalTotal: 98.98,
        shopId: shops[2].id,
        orderItems: {
          create: [
            {
              flowerId: flowers[10].id,
              quantity: 1,
              price: 55.99,
            },
            {
              flowerId: flowers[11].id,
              quantity: 1,
              price: 42.99,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} sample orders`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
