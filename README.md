# E-Commerce App

A full-stack e-commerce application built with a modern tech stack, featuring an admin dashboard, customer frontend, and robust backend API.

## 🌐 Live Website

- **Frontend:** [https://e-commerce-app-frontend-mu-brown.vercel.app/](https://e-commerce-app-frontend-mu-brown.vercel.app/)
- **Admin Dashboard:** [https://e-commerce-app-admin-green.vercel.app/](https://e-commerce-app-admin-green.vercel.app/)

## Project Structure

The project is organized into three main directories:

- **Admin/** - Admin dashboard for managing products, orders, and inventory
- **Frontend/** - Customer-facing e-commerce storefront
- **Backend/** - Node.js/Express API server

## Tech Stack

### Frontend & Admin
- **Vite** - Next-generation frontend build tool
- **React** - UI library
- **ESLint** - Code quality

### Backend
- **Node.js/Express** - Server runtime and web framework
- **MongoDB** - NoSQL database
- **Cloudinary** - Image/media management
- **JWT** - Authentication & authorization
- **Stripe** - Payment processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-App
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file with required variables

3. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   ```

4. **Setup Admin Dashboard**
   ```bash
   cd Admin
   npm install
   ```

## Running the Application

### Start Backend Server
```bash
cd Backend
npm start
```

### Start Frontend
```bash
cd Frontend
npm run dev
```

### Start Admin Dashboard
```bash
cd Admin
npm run dev
```

## Environment Variables

Each directory has its own `.env` file. Key backend variables include:
- `MONGODB_URI` - MongoDB connection string
- `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`, `CLOUDINARY_NAME` - Cloudinary credentials
- `JWT_SECRET` - Secret key for JWT tokens
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` - Default admin credentials
- `STRIPE_SECRET_KEY` - Stripe API key

## Deployment

The project is configured for Vercel deployment. Each directory contains a `vercel.json` configuration file.

## License

Specify your project license here.