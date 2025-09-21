"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Flowers API')
        .setDescription('API for managing flowers with real-time WebSocket updates')
        .setVersion('1.0')
        .addTag('flowers')
        .addTag('shops')
        .addTag('orders')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const prismaService = app.get(prisma_service_1.PrismaService);
    await seedDatabaseIfEmpty(prismaService);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}
async function seedDatabaseIfEmpty(prisma) {
    try {
        const shopCount = await prisma.shop.count();
        if (shopCount === 0) {
            console.log('🌱 Database is empty, running seed...');
            const { exec } = await Promise.resolve().then(() => require('child_process'));
            const { promisify } = await Promise.resolve().then(() => require('util'));
            const execAsync = promisify(exec);
            try {
                await execAsync('npx tsx prisma/seed.ts');
                console.log('✅ Database seeded successfully!');
            }
            catch (error) {
                console.error('❌ Error seeding database:', error);
            }
        }
        else {
            console.log('✅ Database already has data, skipping seed.');
        }
    }
    catch (error) {
        console.error('❌ Error checking database:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map