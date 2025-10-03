
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Stage

# Next.js 15 Multi-Vendor E-commerce Folder Structure for TerraMartz
```
terramartz/
├── src/
│   ├── app/
│   │   ├── (storefront)/                 # Public-facing pages (SSR, SEO)
│   │   │   ├── layout.tsx                # Storefront layout
│   │   │   ├── page.tsx                  # Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx              # Products listing
│   │   │   │   └── [slug]/page.tsx       # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx              # Cart page
│   │   │
│   │   ├── (auth)/                       # Authentication pages
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   ├── (customer)/                   # Customer dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── profile/page.tsx
│   │   │
│   │   ├── (vendor)/                     # Vendor dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── edit/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── inventory/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── (admin)/                      # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── vendors/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── pending-approval/page.tsx
│   │   │   └── products/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   │
│   │   ├── api/                          # API routes (webhooks, etc.)
│   │   │   └── auth/route.ts
│   │   │
│   │   ├── layout.tsx                    # Root layout
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── loading.tsx
│   │
│   ├── modules/                          # Feature-based modules
│   │   ├── core/                         # Shared across all features
│   │   │   ├── components/               # Global reusable components
│   │   │   ├── hooks/                    # Global custom hooks
│   │   │   ├── utils/                    # Global utility functions
│   │   │   ├── contexts/                    # Global Contents
│   │   │   ├── types/                    # Global TypeScript types
│   │   │   └── constants/                # Global constants
│   │   │
│   │   ├── store/                        # Central Redux store
│   │   │   ├──slice.ts                   # Root slice
│   │   │   ├── index.ts                  # configureStore / provider setup
│   │   │   ├── auth.slice.ts             # Auth-related state
│   │   │   ├── ui.slice.ts               # UI state (theme, sidebar, etc.)
│   │   │   ├── cart.slice.ts             # Cart state
│   │   │   ├── product.slice.ts          # Product state
│   │   │   └── vendor.slice.ts           # Vendor state
│   │   │
│   │   ├── products/                     # Product feature module
│   │   │   ├── components/ProductCard.tsx
│   │   │   ├── hooks/useProducts.ts
│   │   │   ├── services/products.service.ts
│   │   │   ├── actions/products.actions.ts
│   │   │   ├── types/product.types.ts
│   │   │   └── utils/product.utils.ts
│   │   │
│   │   ├── vendors/                      # Vendors feature module
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── actions/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   │
│   │   └── storefront/                   # Storefront feature module
│   │       ├── components/
│   │       │   ├── header/
│   │       │   └── footer/
│   │       └── types/
│   │
│   ├── middleware.ts                     # Root middleware
│   │
│   └── styles/
│       ├── globals.css
│       └── themes/
│           ├── storefront.css
│           └── dashboard.css
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md

```
## Key Design Decisions (Verified with Official Documentation)

### 1. **Route Groups** (using parentheses)
Route groups use parentheses like `(folderName)` for organizational purposes without affecting the URL path, making them ideal for separating site sections like marketing pages and admin pages.

Benefits verified by Next.js docs:
- `(storefront)` - SSR pages for public access
- `(auth)` - Authentication pages
- `(customer)` - Customer dashboard
- `(vendor)` - Vendor dashboard
- `(admin)` - Admin dashboard

URLs remain clean: `/dashboard` not `/(customer)/dashboard`

### 2. **Feature-Based Modules Architecture**
The modules directory follows a feature-based architecture where each module encapsulates its own logic, components, and utilities, enhancing maintainability, scalability, and reusability.

Each module contains:
- **components/**: UI elements specific to the feature
- **hooks/**: Custom React hooks for the feature
- **services/**: API calls and business logic
- **actions/**: Server Actions for mutations
- **types/**: TypeScript interfaces
- **utils/**: Feature-specific utilities

### 3. **SSR vs Client Components**
- **Storefront pages**: Default to Server Components (better SEO, faster initial load)
- **Dashboard pages**: Can use client components where needed
- Use `"use client"` directive only when needed (interactivity, hooks, state)

### 4. **Server Actions Pattern**
- Located in `modules/{feature}/actions/`
- Called from client components
- Handle all mutations (create, update, delete)
- More efficient than API routes for most operations

### 5. **Private Folders** (Optional Enhancement)
Private folders can be created by prefixing with an underscore like `_folderName`, which tells the routing system to exclude that folder from routing.

Example: `_components/` or `_utils/` to prevent accidental routing

### 5. File Naming Conventions

```
Components:     PascalCase       ProductCard.tsx
Utilities:      camelCase        formatCurrency.ts
Types:          PascalCase       Product.types.ts
Actions:        camelCase        products.actions.ts
Services:       camelCase        products.service.ts
Hooks:          camelCase        useProducts.ts
Constants:      UPPER_SNAKE      PAYMENT_METHODS.ts
