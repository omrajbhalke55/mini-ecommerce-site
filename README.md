```markdown
# 1. Final Folder Structure

```
```
src/
│── assets/              # images, icons
│
│── data/
│   │── products.js      # static product dataset
│
│── components/
│   │── common/
│   │   │── Navbar.jsx
│   │   │── SearchBar.jsx
│   │   │── Loader.jsx
│   │
│   │── product/
│   │   │── ProductCard.jsx
│   │   │── ProductGrid.jsx
│   │   │── ProductFilters.jsx
│   │
│   │── cart/
│   │   │── CartItem.jsx
│   │   │── CartSummary.jsx
│   │   │── CouponBox.jsx
│   │
│   │── checkout/
│   │   │── OrderSummary.jsx
│
│── pages/
│   │── Home.jsx
│   │── ProductDetails.jsx
│   │── Cart.jsx
│   │── Checkout.jsx
│
│── context/
│   │── CartContext.jsx
│
│── hooks/
│   │── useCart.js
│   │── useLocalStorage.js
│
│── utils/
│   │── pricing.js       # tax, discount logic
│   │── filters.js       # filter/sort logic
│
│── routes/
│   │── AppRoutes.jsx
│
│── App.jsx
│── main.jsx

```

```

---

# 2. Component Planning (What You Must Build)

## 🔹 Core Components

### 2.1 Product Side
- ProductCard → shows image, price, rating  
- ProductGrid → layout  
- ProductFilters → category + price + sort  
- SearchBar  

### 2.2 Cart Side
- CartItem → quantity stepper + remove  
- CartSummary → subtotal, tax, total  
- CouponBox → apply/remove coupon  

### 2.3 Checkout
- OrderSummary  

---

## 🔹 Smart Components (Important)

- CartContext → global cart state  
- useCart() → reusable cart logic  
- useLocalStorage() → persistence hook  

---

# 3. Routing Plan (React Router)

```
```
/
/products/:id
/cart
/checkout
```
````

**Flow**  
Home → Product Details → Cart → Checkout  

---

# 7. State Management Plan

Use Context API  

**CartContext:**
- cartItems  
- addToCart()  
- removeFromCart()  
- updateQuantity()  
- applyCoupon()  
- clearCart()  

---

# 8. localStorage Strategy

**Hook idea:**

```js
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
````

---

# 9. Edge Cases (Interview Gold)

You MUST plan these:

* Quantity > stock
* Invalid coupon
* Empty cart checkout
* Duplicate item add
* Refresh during checkout
* Floating point price errors

---

# 10. Visual Architecture Diagram

```
                        ┌──────────────────────┐
                        │      App.jsx         │
                        │ (Root Component)     │
                        └─────────┬────────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │   AppRoutes.jsx      │
                        │ (React Router)       │
                        └─────────┬────────────┘
                                  │
        ┌───────────────┬─────────┴─────────┬───────────────┐
        ▼               ▼                   ▼               ▼
┌──────────────┐ ┌──────────────┐  ┌──────────────┐ ┌──────────────┐
│   Home.jsx   │ │ ProductDetails│ │   Cart.jsx   │ │ Checkout.jsx │
│ (Catalog)    │ │     .jsx      │ │              │ │              │
└──────┬───────┘ └──────┬───────┘  └──────┬───────┘ └──────┬───────┘
       │                │                 │                │
       ▼                ▼                 ▼                ▼

┌──────────────────────────────────────────────────────────────────┐
│                        COMPONENT LAYER                           │
├──────────────────────────────────────────────────────────────────┤
│ ProductGrid   ProductCard   Filters   SearchBar                  │
│ CartItem      CartSummary   CouponBox                            │
│ OrderSummary  Navbar                                             │
└──────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼

                    ┌──────────────────────────┐
                    │     CartContext.jsx      │
                    │ (Global State Manager)   │
                    └─────────┬────────────────┘
                              │
                              ▼

                    ┌──────────────────────────┐
                    │        useCart()         │
                    │ (Business Logic Layer)   │
                    └─────────┬────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ pricing.js   │   │ filters.js       │   │ localStorage     │
│ (tax/total)  │   │ (search/sort)    │   │ (persistence)    │
└──────────────┘   └──────────────────┘   └──────────────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  products.js       │
                    │ (Static Dataset)   │
                    └────────────────────┘
```

---

# 11. Data Flow

## 🛒 Add to Cart Flow

ProductCard → useCart() → CartContext → localStorage

## 💰 Pricing Flow

CartContext → pricing.js → CartSummary → UI

## 🔍 Filter/Search Flow

User Input → filters.js → ProductGrid → UI update

## 🔁 Persistence Flow

CartContext → localStorage (save)
App Load → localStorage → CartContext (restore)

```
```
