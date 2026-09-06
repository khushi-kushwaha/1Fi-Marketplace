# 1Fi Marketplace

A responsive full-stack marketplace experience integrated into the 1Fi Shop flow, allowing users to browse products, explore variants, compare pricing, view EMI plans, and proceed with a selected EMI option.

The application focuses on a smooth mobile-first shopping experience with dynamic product data, backend-driven EMI calculations, reusable UI components, and complete loading and error handling.

## Features

### Marketplace
- Browse available phones and laptops
- Search products by product name or brand
- Filter products by category
- View product image, brand, pricing, MRP, and starting EMI
- Navigate seamlessly from product listing to product details

### Product Details
- Detailed product information
- Multiple product color options
- Dynamic product images based on selected color
- Multiple storage / memory variants
- Dynamic pricing based on selected variant
- EMI plans with different tenures and interest rates
- No-cost EMI identification
- Real-time EMI updates when the selected variant or plan changes
- Selected product, variant, color, tenure, and EMI summary

### EMI Flow
- EMI calculations are handled by the backend
- EMI values are generated dynamically for every product variant and tenure
- Users can select their preferred EMI plan
- Review selected EMI details before continuing
- Confirmation bottom sheet for the final selection

### User Experience
- Mobile-first responsive interface
- Loading skeletons while product data is being fetched
- API error states with retry functionality
- Product-not-found handling
- Empty search/filter states
- Smooth navigation between Marketplace and product details
- Consistent Shop navigation and layout

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Architecture

```text
1fi-marketplace/
│
├── client/
│   ├── public/
│   │   └── products/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── shop/
│   │   │       ├── PromoBanner.jsx
│   │   │       ├── ShopTabs.jsx
│   │   │       ├── SearchBar.jsx
│   │   │       ├── ComingSoonState.jsx
│   │   │       ├── MarketplaceSection.jsx
│   │   │       └── BottomNav.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ShopPage.jsx
│   │   │   └── ProductDetailPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   └── package.json
│
└── server/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   └── productController.js
    │
    ├── models/
    │   └── Product.js
    │
    ├── routes/
    │   └── productRoutes.js
    │
    ├── utils/
    │   └── calculateEmi.js
    │
    ├── seed.js
    ├── server.js
    ├── .env.example
    └── package.json
```

## Application Flow

```text
MongoDB
   ↓
Express / Node.js API
   ↓
Product + EMI Processing
   ↓
React Frontend
   ↓
Marketplace
   ↓
Product Details
   ↓
Variant & EMI Selection
   ↓
Selection Confirmation
```

Product and EMI information is retrieved dynamically through the backend API instead of being hardcoded directly inside the UI components.

## API Endpoints

### Get all products

```http
GET /api/products
```

Returns the complete product catalogue including variants, colors, prices, EMI plans, and calculated monthly EMI values.

### Get product by slug

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-17-pro
```

Returns detailed information for a single product.

## Dynamic EMI Calculation

EMI calculations are performed on the backend.

For no-cost EMI plans:

```text
Monthly EMI = Product Price / Number of Months
```

For interest-based plans, the monthly EMI is calculated using the standard reducing-balance EMI formula.

The API generates EMI values for each product variant across the available EMI plans, allowing the frontend to consume and display the calculated values directly.

## Routes

```text
/                            → Marketplace
/shop                        → Marketplace
/shop/brands                 → Top Brands
/shop/stores                 → Nearby Stores
/shop/marketplace            → Marketplace
/shop/marketplace/:slug      → Product Details
```

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd 1fi-marketplace
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

Create a `.env` file using `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

For a local MongoDB instance, for example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/onefi_marketplace
```

### 4. Seed product data

Make sure MongoDB is running, then execute:

```bash
node seed.js
```

This initializes the product catalogue in MongoDB.

### 5. Start the backend

```bash
npm run dev
```

The frontend and backend will now communicate through the configured API URL.

## Data Model

Each product contains structured information for:

- Product name
- Brand
- Category
- Slug
- Product colors
- Color-specific images
- Product variants
- Price and MRP
- EMI tenure
- Interest rate

Calculated EMI information is added dynamically by the backend API before product data is returned to the frontend.

## Error & Loading Handling

The Marketplace includes dedicated states for:

- Initial API loading
- Product loading skeletons
- Failed API requests
- Retry actions
- Invalid product routes
- Product-not-found responses
- Empty search results
- Empty category results

This keeps the user experience predictable even when product data is unavailable or an API request fails.

## Responsive Design

The interface follows a mobile-first approach and maintains a compact Shop experience across different screen sizes.

Reusable components are used for shared elements such as navigation, search, tabs, promotional content, product listings, and application states.

## Current Product Categories

- Phones
- Laptops

The product data structure is designed so additional products, variants, colors, categories, and EMI plans can be added through the backend without modifying individual UI components.