# BillBox - Aplikacja do zarządzania rachunkami i budżetem

BillBox to nowoczesna aplikacja webowa do zarządzania rachunkami i budżetem osobistym, zbudowana przy użyciu Next.js 15, Firebase i Tailwind CSS.

## 🚀 Technologie

- **Next.js 15** - Framework React z App Router
- **Firebase** - Backend i autentykacja
- **Tailwind CSS** - Stylowanie
- **TypeScript** - Typowanie statyczne
- **Zustand** - Zarządzanie stanem

## 📁 Struktura projektu

```
src/
├── app/                      # App Router - główny katalog routingu
│   ├── layout.tsx           # Główny layout aplikacji
│   ├── page.tsx            # Strona główna
│   ├── loading.tsx         # Komponent ładowania
│   ├── error.tsx           # Obsługa błędów
│   ├── not-found.tsx       # Strona 404
│   ├── auth/               # Sekcja autentykacji
│   ├── billing/            # Sekcja rachunków
│   ├── dashboard/          # Panel główny
│   └── reports/            # Sekcja raportów
│
├── components/             # Komponenty React (Atomic Design)
│   ├── atoms/             # Podstawowe komponenty (przyciski, inputy)
│   ├── molecules/         # Złożone komponenty (formularze, karty)
│   ├── organisms/         # Sekcje komponentów (nagłówki, stopki)
│   └── templates/         # Szablony stron
│
├── lib/                   # Biblioteki i narzędzia
│   ├── firebase/         # Konfiguracja Firebase
│   ├── utils/            # Funkcje pomocnicze
│   ├── constants/        # Stałe
│   └── types/           # Typy TypeScript
│
├── hooks/                # Własne hooki React
├── store/               # Zarządzanie stanem (Zustand)
├── services/           # Serwisy API
├── config/            # Pliki konfiguracyjne
└── assets/           # Zasoby statyczne
```

## 🏗️ Architektura

### App Router (Next.js 15)

- Każda ścieżka w `app/` może zawierać:
  - `page.tsx` - komponent strony
  - `layout.tsx` - layout dla danej ścieżki
  - `loading.tsx` - komponent ładowania
  - `error.tsx` - obsługa błędów
  - `not-found.tsx` - strona 404

### Atomic Design

Projekt wykorzystuje metodologię Atomic Design do organizacji komponentów:

- **Atoms** - podstawowe komponenty (przyciski, inputy, ikony)
- **Molecules** - grupy atomów (formularze, karty, paski wyszukiwania)
- **Organisms** - większe sekcje (nagłówki, stopki, listy)
- **Templates** - szablony stron

## 🚀 Rozpoczęcie pracy

1. Sklonuj repozytorium:

```bash
git clone https://github.com/twoj-username/billbox.git
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Skonfiguruj zmienne środowiskowe:

```bash
cp .env.example .env.local
```

4. Uruchom serwer deweloperski:

```bash
npm run dev
```

## 🔧 Konfiguracja Firebase

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com/)
2. Włącz potrzebne usługi:
   - Authentication (Email/Password, Google)
   - Firestore Database
   - Storage
   - Analytics (opcjonalnie)
3. Skopiuj konfigurację projektu:
   - Przejdź do ustawień projektu (⚙️)
   - Wybierz "Ustawienia projektu"
   - Przewiń do sekcji "Konfiguracja SDK"
   - Wybierz "Konfiguracja dla web"
4. Skopiuj wartości z konfiguracji do pliku `.env.local`:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```
5. Skonfiguruj reguły bezpieczeństwa Firestore:
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
6. Skonfiguruj reguły Storage:
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

## 📝 Konwencje kodowania

- Używamy TypeScript dla lepszej kontroli typów
- Komponenty są organizowane według Atomic Design
- Server Components są domyślnie w `app/`
- Client Components są w `components/`
- Stylowanie odbywa się poprzez Tailwind CSS

## 🤝 Współpraca

1. Fork projektu
2. Utwórz branch dla swojej funkcjonalności (`git checkout -b feature/AmazingFeature`)
3. Commituj zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest licencjonowany pod MIT License - zobacz plik [LICENSE.md](LICENSE.md) dla szczegółów.
