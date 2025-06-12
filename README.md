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
src/
├── app/                      # App Router - main routing directory
│   ├── layout.tsx           # Main application layout
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Loading component
│   ├── error.tsx           # Error handling
│   ├── not-found.tsx       # 404 page
│   ├── auth/               # Authentication section
│   ├── billing/            # Billing section
│   ├── dashboard/          # Dashboard section
│   └── reports/            # Reports section
│
├── components/             # React Components (Atomic Design)
│   ├── atoms/             # Basic components (buttons, inputs)
│   ├── molecules/         # Complex components (forms, cards)
│   ├── organisms/         # Component sections (headers, footers)
│   └── templates/         # Page templates
│
├── lib/                   # Libraries and tools
│   ├── firebase/         # Firebase configuration
│   ├── utils/            # Helper functions
│   ├── constants/        # Constants
│   └── types/           # TypeScript types
│
├── hooks/                # Custom React hooks
├── store/               # State management
├── services/           # API services
├── config/            # Configuration files
└── assets/           # Static assets
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
5. Configure Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
6. Configure Storage rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
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

## 📱 Web App

[APK link will be added after mobile app development]

## 📸 Screenshots
