# Angular Best Practices & Coding Standards

This document outlines the **best practices, coding standards, and modern Angular features** to ensure clean, scalable, and maintainable applications. Following these practices helps teams achieve consistency, readability, performance, and long-term sustainability.

---

## 📌 Table of Contents
1. [Project Structure](#project-structure)  
2. [Coding Standards](#coding-standards)  
3. [Best Practices](#best-practices)  
4. [Performance Optimization](#performance-optimization)  
5. [Angular Latest Features](#angular-latest-features)  
6. [Testing Guidelines](#testing-guidelines)  
7. [Security Practices](#security-practices)  
8. [References](#references)  

---

## 📁 Project Structure
Maintain a **modular, feature-based folder structure**:
```
src/
 ├── app/
 │    ├── core/               # Core services, interceptors, guards
 │    ├── shared/             # Shared components, directives, pipes
 │    ├── features/           # Feature modules (lazy-loaded)
 │    ├── layouts/            # Global layouts
 │    ├── app-routing.module.ts
 │    └── app.module.ts
 ├── assets/
 ├── environments/
 └── main.ts
```

---

## 📝 Coding Standards

- **Naming Conventions**  
  - Components: `PascalCase` → `UserProfileComponent`  
  - Services: `PascalCase` + `Service` → `AuthService`  
  - Interfaces: Prefix with `I` → `IUser`  
  - Observables: Use `$` suffix → `userData$`  

- **Type Safety**  
  - Always use **strict typing** (no `any`) - Exclude (Hari).  
  - Enable `"strict": true` in `tsconfig.json`.  

- **Code Formatting**  
  - Follow **Angular ESLint rules**.  
  - Prettier for consistent formatting.  

- **Imports**  
  - Group imports by: Angular → Third-party → Local.  
  - Use **path aliases** (`tsconfig.json`) for readability.

---

## ✅ Best Practices

- Use **Reactive Forms** instead of Template-driven for scalability.  
- Prefer **OnPush change detection** for better performance.  
- Avoid logic inside **components**; use services for business logic.  
- Use **async pipe** instead of manual subscription/unsubscription.  
- Always unsubscribe when manual subscriptions are required (`takeUntil`).  
- Use **environment variables** instead of hardcoding values.  
- Lazy-load feature modules to optimize bundle size.  

---

## 🚀 Performance Optimization

- Use **trackBy** in `*ngFor` to reduce re-rendering.  
- Implement **Standalone Components** for lightweight setups.  
- Use **Signals (Angular 16+)** for reactive state management.  
- Optimize **change detection** with `ChangeDetectionStrategy.OnPush`.  
- Split large modules into smaller, lazy-loaded chunks.  
- Use **pure pipes** for data transformations.  
- Preload critical modules with `PreloadAllModules`.  

---

## 🆕 Angular Latest Features

### Angular 16+ & 17+ Key Features:
- ✅ **Standalone Components** → No need for `NgModule`.  
- ✅ **Signals API** → Reactive state management without RxJS boilerplate.  
- ✅ **Functional Guards & Resolvers** → More concise route handling.  
- ✅ **Enhanced Hydration** → Better SSR performance.  
- ✅ **Directive Composition API** → Reuse directive logic.  
- ✅ **Required Inputs** → Enforce required component inputs.  
- ✅ **Typed Forms** → Strongly typed reactive forms.  
- ✅ **Deferred Loading** (`@defer`) → Optimize rendering of non-critical components.  
- ✅ **Improved Server-Side Rendering (SSR) with hydration**.  
- ✅ **Automatic Zonal-less Change Detection (Future)** → No need for `zone.js`.  

---

## 🧪 Testing Guidelines

- Write **unit tests** with Jasmine/Karma or Jest.  
- Use **TestBed** utilities for Angular testing.  
- Test **components in isolation** with mocked dependencies.  
- Ensure **80%+ code coverage**.  
- Write **end-to-end (E2E) tests** with Cypress or Playwright.  

---

## 🔒 Security Practices

- Always **sanitize user inputs** (`DomSanitizer`).  
- Use **Angular built-in XSS protection** (never use `innerHTML` directly).  
- Store secrets/config in **environment files or secure storage**, not in code.  
- Implement **route guards** (`AuthGuard`, `RoleGuard`).  
- Use **JWT or OAuth2** for authentication/authorization.  
- Enable **CSP & HTTPS** in deployment.  

---


---

## ⚡ Additional Best Practices

### Don’t Ignore Unsubscribing
When manually subscribing to Observables, always unsubscribe in `ngOnDestroy` to prevent memory leaks.  
- Prefer `takeUntil` or `async pipe` for automatic cleanup.

### Don’t Put Business Logic in Components
Keep components lean.  
- Move business logic to **services** for reusability and maintainability.

---

## 📊 Angular Feature Usage Guide

| Feature                      | When to Use                                                     | Example Use Case                      |
| ---------------------------- | --------------------------------------------------------------- | ------------------------------------- |
| **Signal**                   | Local reactive state, replacing some RxJS in components         | Counter, toggle, UI state             |
| **ngModel**                  | Small template-driven forms                                     | Login form, search box                |
| **subscribe**                | Side effects in services / components (if not using async pipe) | API call, event streams               |
| **Services**                 | Shared logic, APIs, state management                            | UserService, AuthService              |
| **Directive**                | Reuse behavior / DOM manipulation                               | Highlight, tooltip, validation        |
| **Pipe**                     | Template value transformation                                   | Date, currency, custom filters        |
| **@Input() / @Output()**     | Parent ↔ Child communication                                    | Pass data to child, emit events       |
| **Local / Session Storage**  | Persist data across reloads / sessions                          | Auth tokens, user preferences         |
| **ViewChild / ContentChild** | Access child component or DOM element directly                  | Call child methods, get template refs |

## 📚 References
- [Angular Official Documentation](https://angular.dev)  
- [Angular Style Guide](https://angular.io/guide/styleguide)  
- [RxJS Documentation](https://rxjs.dev)  

---

✅ Following this guide ensures **scalability, maintainability, and performance** in Angular applications.  
