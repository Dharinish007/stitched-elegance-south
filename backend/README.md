# Tailoring Portfolio Backend

Production-ready Node.js backend for a tailoring portfolio website with admin workspace and user wishlist functionality.

## Features

- 🔐 **Authentication**: JWT-based auth for users and admins
- 📸 **Image Management**: Cloudinary integration for image storage
- 🛡️ **Security**: Helmet, CORS, rate limiting, bcrypt password hashing
- 📊 **Admin Panel**: Upload, edit, delete designs with audit logging
- ❤️ **User Wishlist**: Save and manage favorite designs
- 🔍 **Search & Filter**: Search designs by title, description, and tags
- 📝 **API Documentation**: OpenAPI spec and Postman collection
- ✅ **Testing**: Comprehensive Jest test suite
- 🚀 **Production Ready**: Configured for Render deployment

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon free tier)
- **ORM**: Prisma
- **Image Storage**: Cloudinary
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, express-rate-limit
- **Testing**: Jest + Supertest
- **Hosting**: Render (backend) + Neon (database) + Cloudinary (images)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Set up database**:
   ```bash
   npx prisma migrate dev
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access admin panel**: http://localhost:3000/admin

## Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens (min 32 chars)
- `CLOUDINARY_*`: Cloudinary credentials
- `ADMIN_*`: Bootstrap admin user credentials
- `ALLOWED_ORIGINS`: CORS allowed origins

## API Endpoints

- **Public**: `/api/designs` - Get all designs
- **Auth**: `/api/auth/*` - Register, login, profile
- **Admin**: `/api/admin/*` - Manage designs (admin only)
- **Wishlist**: `/api/wishlist/*` - User wishlist management

## Deployment

### Render + Neon + Cloudinary

1. **Create Neon database**: https://neon.tech
2. **Create Cloudinary account**: https://cloudinary.com
3. **Deploy to Render**: Connect GitHub repo, Render will auto-deploy
4. **Set environment variables** in Render dashboard

## Testing

```bash
npm test                # Run all tests
npm run test:watch     # Watch mode
```

## Admin Panel

Access at `/admin` with admin credentials. Features:
- Upload new designs with images
- View all designs in grid layout
- Delete designs with confirmation
- Automatic image optimization via Cloudinary

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- File upload validation (5MB limit, image types only)
- Admin role-based access control

## Database Schema

- **Users**: Authentication and roles
- **Designs**: Portfolio items with images
- **WishlistItems**: User favorite designs
- **AuditLogs**: Admin action tracking

## License

MIT