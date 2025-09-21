# 📚 API Documentation

Complete API reference for the Flowers Shop backend application.

## 🌐 Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## 🔐 Authentication

Currently, the API does not require authentication. In production, consider implementing:
- JWT tokens
- API keys
- OAuth2

## 📋 API Endpoints

### 🌸 Flowers

#### Get All Flowers
```http
GET /flowers
```

**Response:**
```json
[
  {
    "id": "flower-id-123",
    "name": "Rose Bouquet",
    "price": 25.99,
    "image": "/images/rose-bouquet.jpg",
    "description": "Beautiful pink roses",
    "shopId": "shop-id-123",
    "dateAdded": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z",
    "shop": {
      "id": "shop-id-123",
      "name": "Flowery Fragrant",
      "location": "123 Garden Street",
      "address": "123 Garden Street, Bloomville",
      "phone": "+1 (555) 123-4567",
      "hours": "9:00 AM - 8:00 PM",
      "latitude": 30.5234,
      "longitude": 50.4501
    }
  }
]
```

#### Get Flower by ID
```http
GET /flowers/:id
```

**Parameters:**
- `id` (string): Flower ID

**Response:**
```json
{
  "id": "flower-id-123",
  "name": "Rose Bouquet",
  "price": 25.99,
  "image": "/images/rose-bouquet.jpg",
  "description": "Beautiful pink roses",
  "shopId": "shop-id-123",
  "dateAdded": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z",
  "shop": {
    "id": "shop-id-123",
    "name": "Flowery Fragrant",
    "location": "123 Garden Street",
    "address": "123 Garden Street, Bloomville",
    "phone": "+1 (555) 123-4567",
    "hours": "9:00 AM - 8:00 PM",
    "latitude": 30.5234,
    "longitude": 50.4501
  }
}
```

#### Get Flowers by Shop
```http
GET /flowers/shop/:shopId
```

**Parameters:**
- `shopId` (string): Shop ID

**Response:** Array of flowers (same format as above)

#### Create Flower
```http
POST /flowers
```

**Request Body:**
```json
{
  "name": "Rose Bouquet",
  "price": 25.99,
  "image": "/images/rose-bouquet.jpg",
  "description": "Beautiful pink roses",
  "shopId": "shop-id-123"
}
```

**Response:** Created flower object

#### Update Flower
```http
PATCH /flowers/:id
```

**Parameters:**
- `id` (string): Flower ID

**Request Body:**
```json
{
  "name": "Updated Rose Bouquet",
  "price": 29.99,
  "description": "Updated description"
}
```

**Response:** Updated flower object

#### Delete Flower
```http
DELETE /flowers/:id
```

**Parameters:**
- `id` (string): Flower ID

**Response:** `204 No Content`

### 🏪 Shops

#### Get All Shops
```http
GET /shops
```

**Response:**
```json
[
  {
    "id": "shop-id-123",
    "name": "Flowery Fragrant",
    "location": "123 Garden Street, Bloomville",
    "address": "123 Garden Street, Bloomville",
    "phone": "+1 (555) 123-4567",
    "hours": "9:00 AM - 8:00 PM",
    "latitude": 30.5234,
    "longitude": 50.4501,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "flowers": [...],
    "orders": [...]
  }
]
```

#### Get Shop by ID
```http
GET /shops/:id
```

**Parameters:**
- `id` (string): Shop ID

**Response:** Shop object with flowers and orders

#### Create Shop
```http
POST /shops
```

**Request Body:**
```json
{
  "name": "New Flower Shop",
  "location": "456 New Street",
  "address": "456 New Street, City",
  "phone": "+1 (555) 999-8888",
  "hours": "8:00 AM - 9:00 PM",
  "latitude": 30.5000,
  "longitude": 50.5000
}
```

**Response:** Created shop object

#### Update Shop
```http
PATCH /shops/:id
```

**Parameters:**
- `id` (string): Shop ID

**Request Body:** Partial shop object

**Response:** Updated shop object

#### Delete Shop
```http
DELETE /shops/:id
```

**Parameters:**
- `id` (string): Shop ID

**Response:** `204 No Content`

### 📦 Orders

#### Get All Orders
```http
GET /orders
```

**Response:**
```json
[
  {
    "id": "order-id-123",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1 (555) 123-4567",
    "customerAddress": "123 Main St, City",
    "total": 51.98,
    "originalTotal": 60.00,
    "discountAmount": 8.02,
    "orderDate": "2024-01-15T00:00:00.000Z",
    "shopId": "shop-id-123",
    "couponId": "coupon-id-123",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z",
    "shop": {...},
    "coupon": {...},
    "orderItems": [
      {
        "id": "item-id-123",
        "quantity": 2,
        "price": 25.99,
        "flower": {...}
      }
    ]
  }
]
```

#### Get Order by ID
```http
GET /orders/:id
```

**Parameters:**
- `id` (string): Order ID

**Response:** Order object with details

#### Get Orders by Customer
```http
GET /orders/customer/:email
```

**Parameters:**
- `email` (string): Customer email

**Response:** Array of orders

#### Get Orders by Shop
```http
GET /orders/shop/:shopId
```

**Parameters:**
- `shopId` (string): Shop ID

**Response:** Array of orders

#### Create Order
```http
POST /orders
```

**Request Body:**
```json
{
  "items": [
    {
      "flowerId": "flower-id-123",
      "quantity": 2,
      "price": 25.99
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St, City"
  },
  "total": 51.98,
  "originalTotal": 60.00,
  "discountAmount": 8.02,
  "shopId": "shop-id-123",
  "couponId": "coupon-id-123"
}
```

**Response:** Created order object

## 🔄 WebSocket Events

### Connection
Connect to WebSocket at: `ws://localhost:3000` (or `wss://your-domain.com` in production)

### Client to Server Events

#### Create Flower
```javascript
socket.emit('flowers:create', {
  name: 'New Flower',
  price: 19.99,
  image: '/images/new-flower.jpg',
  description: 'A beautiful new flower',
  shopId: 'shop-id-123'
});
```

#### Update Flower
```javascript
socket.emit('flowers:update', {
  id: 'flower-id-123',
  updateData: {
    name: 'Updated Flower Name',
    price: 24.99
  }
});
```

#### Delete Flower
```javascript
socket.emit('flowers:delete', 'flower-id-123');
```

#### Refresh Flowers
```javascript
socket.emit('flowers:refresh');
```

### Server to Client Events

#### Initial Data
```javascript
socket.on('flowers:init', (flowers) => {
  console.log('Received initial flowers:', flowers);
});
```

#### Flower Created
```javascript
socket.on('flowers:created', (flower) => {
  console.log('New flower created:', flower);
});
```

#### Flower Updated
```javascript
socket.on('flowers:updated', (flower) => {
  console.log('Flower updated:', flower);
});
```

#### Flower Deleted
```javascript
socket.on('flowers:deleted', (flowerId) => {
  console.log('Flower deleted:', flowerId);
});
```

#### Flowers Refreshed
```javascript
socket.on('flowers:refreshed', (flowers) => {
  console.log('Flowers refreshed:', flowers);
});
```

## 📊 Response Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 204  | No Content - Resource deleted successfully |
| 400  | Bad Request - Invalid request data |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error - Server error |

## 🔍 Error Responses

### Validation Error
```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "price must be a positive number"
  ],
  "error": "Bad Request"
}
```

### Not Found Error
```json
{
  "statusCode": 404,
  "message": "Flower with ID flower-id-123 not found",
  "error": "Not Found"
}
```

## 🧪 Testing the API

### Using cURL

#### Get all flowers
```bash
curl -X GET http://localhost:3000/flowers
```

#### Create a flower
```bash
curl -X POST http://localhost:3000/flowers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Flower",
    "price": 19.99,
    "image": "/images/test.jpg",
    "description": "A test flower",
    "shopId": "shop-id-123"
  }'
```

### Using Postman
1. Import the API collection
2. Set base URL to `http://localhost:3000`
3. Test endpoints with sample data

### Using Swagger UI
Visit `http://localhost:3000/api/docs` for interactive API documentation.

## 📈 Rate Limiting

Currently, there is no rate limiting implemented. Consider adding:
- Request rate limiting per IP
- API key-based rate limiting
- User-based rate limiting

## 🔒 Security Headers

The API includes basic security headers:
- CORS configuration
- Content-Type validation
- Request size limits

For production, consider adding:
- Helmet.js for security headers
- Rate limiting
- Request validation
- API authentication

---

**For more information, visit the Swagger documentation at `/api/docs` when the server is running.**
