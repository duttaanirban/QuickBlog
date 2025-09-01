# QuickBlog

A full-stack blogging platform with admin dashboard, built with React (Vite) and Node.js/Express/MongoDB.

## Features

- Modern blog UI with categories, comments, and images
- Admin dashboard for blog and comment management
- JWT-based authentication for admin routes
- Image upload and optimization (ImageKit)
- AI-powered content generation (Gemini API)
- Responsive design

## Project Structure

```
QuickBlog/
├── client/      # React frontend (Vite)
├── server/      # Node.js/Express backend
```

### Client (Frontend)
- React + Vite
- Context API for global state
- Axios for API requests
- Tailwind CSS for styling
- Quill rich text editor

### Server (Backend)
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- ImageKit for image hosting
- Gemini API for AI content

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance
- ImageKit account (for image uploads)
- Gemini API key (for AI content)

### 1. Clone the repository
```
git clone <repo-url>
cd QuickBlog
```

### 2. Setup Environment Variables
Create `.env` files in both `client` and `server` folders. See `.env.example` or below:

#### server/.env
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GEMINI_API_KEY=your_gemini_api_key
```

#### client/.env
```
VITE_BASE_URL=http://localhost:5000
```

### 3. Install Dependencies
```
cd server
npm install
cd ../client
npm install
```

### 4. Run the App
- Start the backend:
  ```
  cd server
  npm start
  ```
- Start the frontend:
  ```
  cd client
  npm run dev
  ```

### 5. Access the App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Usage
- Visit `/admin` to log in as admin (use credentials from your `.env`)
- Add, edit, and delete blogs from the dashboard
- Approve or delete comments
- Generate blog content with AI


