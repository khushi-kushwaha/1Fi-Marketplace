# 1Fi Marketplace

A responsive full-stack marketplace experience built within the 1Fi Shop flow. Users can browse products, explore variants, view dynamically calculated EMI plans, and proceed with their selected EMI option.

## Live Demo

**Frontend:** https://onefi-marketplace-frontend.onrender.com
**Backend API:** https://onefi-marketplace-backend-ne8y.onrender.com  
**API:** https://onefi-marketplace-backend-ne8y.onrender.com/api/products


## Features

- Product listing with images, pricing, MRP, and starting EMI
- Search products by name or brand
- Filter products by category
- Product detail view with multiple colors and variants
- Dynamic product images and pricing based on selection
- 3, 6, and 12-month EMI plans
- No-cost and interest-based EMI options
- Backend-driven EMI calculations
- EMI plan selection and confirmation flow
- Loading skeletons, API error handling, retry, and empty states
- Product-not-found handling
- Responsive, mobile-first Shop experience

## Tech Stack

**Frontend:** React.js, Vite, JavaScript, Tailwind CSS, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Deployment:** Render, MongoDB Atlas

## API

```http
GET /api/products
GET /api/products/:slug
```

Product, variant, pricing, and EMI data is retrieved dynamically through the backend API instead of being hardcoded into UI components.

EMI values are calculated on the backend for each product variant and available tenure.

## Local Setup

Clone the repository:

```bash
git clone <repository-url>
cd 1fi-marketplace
```

### Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Seed the database and start the server:

```bash
node seed.js
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Marketplace Flow

```text
Shop → Marketplace → Product Details
     → Variant & Color Selection
     → EMI Plan Selection
     → Confirmation
```

The application is designed with reusable components, dynamic API-driven data, responsive layouts, and dedicated loading and error states.