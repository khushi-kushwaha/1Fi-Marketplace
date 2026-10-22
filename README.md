# 1Fi Marketplace

A responsive full-stack marketplace built within the 1Fi Shop flow. Users can browse products, explore color and variant options, view dynamically calculated EMI plans, and confirm their selected EMI option.

**Live Demo:** [onefi-marketplace-frontend.onrender.com](https://onefi-marketplace-frontend.onrender.com)
**Backend API:** [onefi-marketplace-backend-ne8y.onrender.com/api/products](https://onefi-marketplace-backend-ne8y.onrender.com/api/products)


## Features

- Product listing with images, pricing, MRP, and starting EMI
- Search by product name or brand
- Filter by category
- Product detail page with multiple colors and variants
- Images and pricing that update with the selected variant
- 3, 6, and 12-month EMI plans
- No-cost and interest-based EMI options
- EMI calculated on the backend for each variant and tenure
- EMI plan selection and confirmation flow
- Loading skeletons, API error handling with retry, and empty states
- Product-not-found handling
- Responsive, mobile-first layout

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React.js, Vite, JavaScript, Tailwind CSS, React Router |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Deployment | Render, MongoDB Atlas |

## Marketplace Flow

```
Shop -> Marketplace -> Product Details
     -> Variant & Color Selection
     -> EMI Plan Selection
     -> Confirmation
```

## Project Structure

```
1Fi-Marketplace/
├── client/     # React + Vite frontend
├── server/     # Express API, Mongoose models, seed script
└── README.md
```

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | List all products |
| GET | `/api/products/:slug` | Get one product with its variants and EMI plans |

Product, variant, pricing, and EMI data is fetched from the backend API and is not hardcoded in UI components. EMI values are calculated on the server for each product variant and available tenure.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/khushi-kushwaha/1Fi-Marketplace.git
cd 1Fi-Marketplace
```

### 2. Set up the backend

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

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the app:

```bash
npm run dev
```

The app runs at the URL Vite prints, usually `http://localhost:5173`.

## Environment Variables

| File | Variable | Description |
| --- | --- | --- |
| `server/.env` | `PORT` | Port for the Express server |
| `server/.env` | `MONGO_URI` | MongoDB connection string |
| `client/.env` | `VITE_API_URL` | Base URL of the backend API |

## Deployment

- **Frontend:** Render static site
- **Backend:** Render web service
- **Database:** MongoDB Atlas

## Author

**Khushi Kushwaha**
[GitHub](https://github.com/khushi-kushwaha) · [LinkedIn](https://www.linkedin.com/in/khushi-kushwaha-302069251/)
