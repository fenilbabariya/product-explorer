# Product Explorer Prompt and Response Log

This document records the user prompts, implementation plans, and delivered responses for the Product Explorer work session.  
Goal: provide a clear timeline so another developer can review decisions, scope changes, and implementation outcomes.

---

## 1) Initial Product API Integration

### User Prompt

`{ id: number, title: string, price: number, description: string, category: string, image: string }`  
`https://fakestoreapi.com/products I have this public API, fetch the products from the API, and show it in the card component, create one card component for the product, and show the product card in products page @src/app/products/page.js`

### Plan

1. Read the current `products` page and existing app setup.
2. Create a reusable product card component.
3. Fetch products from the Fake Store API.
4. Render cards in a responsive grid on the products page.
5. Run lints for changed files.

### Response / Outcome

- Created `src/components/ProductCard.js`.
- Updated `src/app/products/page.js` to:
  - fetch products server-side from `https://fakestoreapi.com/products`
  - render cards in a grid.
- Returned confirmation and offered optional next improvements (`loading.js`, `error.js`, search/filter).

---

## 2) Required Project Structure (TypeScript-first)

### User Prompt

`app/products/page.tsx`  
`components/ProductCard.tsx`  
`SearchBar.tsx`  
`SortDropdown.tsx`  
`utils/filterProducts.ts`  
`Also this is the project structure that need to be followed so remember it for the project`

### Plan

1. Start aligning existing JS implementation to the requested TS structure.
2. Add TS equivalents beginning with `ProductCard.tsx`.
3. Continue migration across page/components/utils.

### Response / Outcome

- Added `src/components/ProductCard.tsx` with typed `Product` and typed props.
- Migration started but not fully completed in that single step.

---

## 3) Product Card Scope Reduction + next/image

### User Prompt

`Product card contains only Image, Title, Price and Category, Also use the next/Image for the image instead of the html img element`

### Plan

1. Update card UI to remove description.
2. Replace `<img>` with `next/image`.
3. Ensure remote image host is configured in Next.js.
4. Validate with lints.

### Response / Outcome

- Updated both:
  - `src/components/ProductCard.js`
  - `src/components/ProductCard.tsx`
- Card now includes only image, category, title, price.
- Switched to `Image` from `next/image`.
- Updated `next.config.mjs` with `images.remotePatterns` for `fakestoreapi.com`.

---

## 4) Debounced Search (Title + Category)

### User Prompt

`@src/components/SearchBar.js In the SearchBar component add search functionality on the products title and category, when user search for the procuts in the dearch bar then it should containt the product in the title or category, also make debounc search for the oprmization`

### Plan

1. Implement debounced search input in `SearchBar`.
2. Add a client layer to hold filtered product state.
3. Keep API fetch in the server page.
4. Render filtered results dynamically.

### Response / Outcome

- Implemented `src/components/SearchBar.js` with:
  - local query state
  - `useEffect` debounce
  - title/category contains matching
- Added `src/components/ProductsClient.js` as client-side orchestration layer.
- Updated `src/app/products/page.js` to render `ProductsClient`.

---

## 5) Smart Dropdown Filtering (Combine Conditions)

### User Prompt

`Also besides the Search add one smart filter options, it has to be a dropdown it should support natural filtering like chepest products, it should also filter based on the catrgory, and if user wants to combine both then it should also work, like clothing product under 200`

### Plan

1. Introduce reusable dropdown component.
2. Add sort/category/price controls.
3. Combine search + filters + sorting in one computation.
4. Preserve existing UX and empty-state behavior.

### Response / Outcome

- Added `src/components/SortDropdown.js`.
- Refactored `SearchBar` to emit debounced query value.
- Updated `ProductsClient` to support combined controls:
  - Sort (`Recommended`, `Cheapest First`, `Highest Price First`)
  - Category (`All` + dynamic categories)
  - Price cap (`Any`, `Under $50`, `Under $100`, `Under $200`)
- Combination behavior enabled (e.g., category + under price + sort).

---

## 6) Additional Name Sort Dropdown

### User Prompt

`Also Add one more sort dropdown for the name sorting filter`

### Plan

1. Add separate name-sort state.
2. Add name sort dropdown UI.
3. Integrate alphabetical sort in result pipeline.

### Response / Outcome

- Updated `ProductsClient`:
  - Added `Name Sort` dropdown with `A-Z` and `Z-A`.
  - Added state + logic for name sorting.
- Layout updated for four controls across large screens.

---

## 7) Keep Price Filter Intact While Sorting

### User Prompt

`Do not remove the price filter when filtering the procuts, price sort should work as expected`

### Plan

1. Ensure filter stage always includes price cap.
2. Make price sort primary when active.
3. Use name sort as secondary/tie-breaker.

### Response / Outcome

- Updated sorting comparator in `ProductsClient`:
  - price filter always applied before sorting
  - price sort handled as primary ordering
  - name sort used as secondary order when applicable
- Confirmed no lint issues.

---

## 8) Memoization Optimization Request

### User Prompt

`Now optmize the product filtering by memoizing the filter`

### Plan

1. Split computation into memoized stages.
2. Memoize filtering separately from sorting.
3. Keep dependency arrays minimal and accurate.

### Response / Outcome

- Refactored `ProductsClient` to use:
  - `filteredProducts` (`useMemo`) for search/category/price filtering
  - `visibleProducts` (`useMemo`) for sorting
- Reduced unnecessary recomputation when only sorting changes.

---

## Final Architecture Snapshot (Current State)

- `src/app/products/page.js`
  - server fetch from Fake Store API
  - renders client UI wrapper
- `src/components/ProductsClient.js`
  - state for search/filter/sort
  - memoized filtering and sorting
- `src/components/SearchBar.js`
  - debounced search input
- `src/components/SortDropdown.js`
  - reusable dropdown control
- `src/components/ProductCard.js`
  - compact card (image, title, price, category) using `next/image`
- `next.config.mjs`
  - remote image host allowlist for `fakestoreapi.com`

---
