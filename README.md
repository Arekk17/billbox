# BillBox - Bill and Budget Management Application

BillBox is a modern web application for managing bills and personal budget, built with Next.js 15, Firebase, and Tailwind CSS.

## 🚀 Technologies

- **Next.js 15.3.0** - React Framework with App Router
- **React 19.0.0** - UI Library
- **Firebase 11.6.0** - Backend and Authentication
- **Tailwind CSS 4** - Styling with daisyUI 5.0.18
- **TypeScript 5** - Static Typing
- **@tanstack/react-query 5.72.2** - Server State Management
- **React Hook Form 7.55.0** - Form Management
- **Zod 3.24.2** - Schema Validation

## 📁 Project Structure

```
billbox/                    # Root directory
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API Routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard section
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── loading.tsx   # Loading component
│   │   ├── error.tsx     # Error handling
│   │   ├── not-found.tsx # 404 page
│   │   ├── globals.css   # Global styles
│   │   └── favicon.ico   # Favicon
│   │
│   ├── components/        # React Components
│   ├── lib/              # Core utilities
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Static assets
│   └── middleware.ts     # Next.js middleware
│
├── public/               # Public assets
├── .next/               # Next.js build output
├── node_modules/        # Dependencies
│
├── .env.example         # Example environment variables
├── .env.local           # Local environment variables
├── .gitignore          # Git ignore rules
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 🏗️ Architecture

### App Router (Next.js 15)

- Each path in `app/` can contain:
  - `page.tsx` - page component
  - `layout.tsx` - layout for the path
  - `loading.tsx` - loading component
  - `error.tsx` - error handling
  - `not-found.tsx` - 404 page

### Atomic Design

The project uses Atomic Design methodology for component organization:

- **Atoms** - basic components (buttons, inputs, icons)
- **Molecules** - groups of atoms (forms, cards, search bars)
- **Organisms** - larger sections (headers, footers, lists)
- **Templates** - page templates

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/billbox.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Firebase Configuration

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Enable required services:
   - Authentication (Email/Password, Google)
   - Firestore Database
   - Storage
   - Analytics (optional)
3. Copy project configuration:
   - Go to project settings (⚙️)
   - Select "Project settings"
   - Scroll to "SDK configuration"
   - Choose "Web configuration"
4. Copy configuration values to `.env.local`:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

## 🔐 Authentication & Security

### Cookie Management

- Secure HTTP-only cookies for session management
- CSRF protection
- SameSite cookie policy
- Secure cookie flags

### Authentication Flow

1. User signs in with email/password or Google
2. Firebase generates JWT token
3. Token stored in secure HTTP-only cookie
4. Middleware validates token on protected routes

## 📡 API Services

### API Routes Structure

```
src/app/api/
├── auth/                    # Authentication endpoints
│   ├── createCookie/       # Create session cookie
│   ├── revokeCookies/      # Clear session cookies
│   └── verify/            # Verify session token
└── me/                     # User profile endpoints
```

### Cookie Management API

```typescript
// src/app/api/auth/createCookie/route.ts
POST /api/auth/createCookie
- Creates secure HTTP-only cookie
- Sets session token
- Configures cookie options (SameSite, Secure, etc.)

// src/app/api/auth/revokeCookies/route.ts
POST /api/auth/revokeCookies
- Clears all session cookies
- Handles logout process

// src/app/api/auth/verify/route.ts
GET /api/auth/verify
- Verifies session token
- Returns user session status
```

### Cookie Configuration

```typescript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  domain: process.env.COOKIE_DOMAIN
}
```

### Authentication Service

```typescript
// src/lib/services/auth.service.ts
- signIn(email: string, password: string)
- signUp(email: string, password: string)
- signOut()
- resetPassword(email: string)
- updateProfile(data: UserProfile)
```

### User Service

```typescript
// src/lib/services/user.service.ts
- getUserProfile(userId: string)
- updateUserSettings(userId: string, settings: UserSettings)
- deleteUserAccount(userId: string)
```

### Category Service

```typescript
// src/lib/services/category.service.ts
- getCategories(userId: string)
- createCategory(data: CategoryData)
- updateCategory(categoryId: string, data: CategoryData)
- deleteCategory(categoryId: string)
```

### Receipt Service

```typescript
// src/lib/services/recipts.service.ts
- getReceipts(userId: string)
- createReceipt(data: ReceiptData)
- updateReceipt(receiptId: string, data: ReceiptData)
- deleteReceipt(receiptId: string)
```

## 📝 Coding Conventions

- TypeScript for better type control
- Components organized by Atomic Design
- Server Components by default in `app/`
- Client Components in `components/`
- Styling with Tailwind CSS
- Form handling with React Hook Form
- Data validation with Zod
- State management with React Query
- API calls through service layer
- Secure cookie handling
- Error boundary implementation

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🔧 Development Scripts

```bash
npm run dev     # Start development server with Turbopack
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 📱 Mobile App

[APK link will be added after mobile app development]

## 📸 Screenshots

## 🔍 Features

- User authentication (Email/Password, Google)
- Bill management and tracking
- Budget planning and monitoring
- Expense categorization
- Financial reports and analytics
- Real-time data updates
- Responsive design
- Offline support (coming soon)
- PWA support (coming soon)
- Secure cookie-based session management
- Protected API routes
- Data validation with Zod
- Error handling and logging
