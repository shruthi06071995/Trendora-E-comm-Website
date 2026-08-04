# Trendora — Full Stack E-Commerce (MERN)

Idhu unga **starter project** — React + Bootstrap + Redux (frontend), Node + Express (backend),
MongoDB Atlas (database), JWT Authentication ellame already set up pannirukken. Ippo nee panna
vendiyadhu: 1) idha run pannu, 2) puriyaama irundha padikanum, 3) unaku venum madiri customize pannu.

---

## 📁 Project Structure

```
famms-app/
├── backend/          → Node + Express + MongoDB API
│   ├── config/db.js       → MongoDB Atlas connection
│   ├── models/             → User, Product, Order (Mongoose schemas)
│   ├── controllers/        → Business logic (register, login, CRUD)
│   ├── middleware/          → JWT auth + admin check
│   ├── routes/               → API endpoints
│   ├── server.js             → Entry point
│   └── seeder.js            → Sample data loader
│
└── frontend/          → React + Redux + Bootstrap
    └── src/
        ├── api/axios.js       → Axios instance (auto-attaches JWT)
        ├── store/                → Redux Toolkit slices (auth, cart, products)
        ├── components/          → Reusable UI (Header, ProductCard, Loader...)
        ├── pages/                → Home, ProductDetails, Cart, Login, Checkout...
        └── App.js                → Routes
```

---

## 🗓️ DAY 1 — Backend + Database Setup (understand + run)

### Step 1: MongoDB Atlas account create pannu
1. https://www.mongodb.com/cloud/atlas -> free account create pannu
2. Free cluster (M0) create pannu
3. **Database Access** -> new user create pannu (username/password)
4. **Network Access** -> "Allow access from anywhere" (0.0.0.0/0) add pannu
5. **Connect** -> "Drivers" -> connection string copy pannu, adhula
   `<username>` `<password>` unga details maathu

### Step 2: Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
`.env` file open pannu, MONGO_URI la unga Atlas connection string paste pannu,
JWT_SECRET la ethachum random string podu (e.g. `mySecretKey123!@#`).

### Step 3: Sample data load pannu (optional but recommended)
```bash
npm run seed
```
Idhu 2 users (1 admin) + 3 sample products database la insert pannum.
Admin login: `admin@famms.com` / `123456`

### Step 4: Backend run pannu
```bash
npm run dev
```
Browser la `http://localhost:5000` open pannu — "FAMMS App API is running..." nu varanum.
Idhu vandha, unga backend + database connection perfect ah irukku!

### Understand pannu (Day 1 la yenna kathukanum):
- **Mongoose Schema** enna? (models/Product.js paaru) — database la data eppadi irukkum nu structure
- **Express Routes** enna? (routes/productRoutes.js) — URL + HTTP method (GET/POST/PUT/DELETE) mapping
- **Controller** enna? — actual logic (database la irundhu data eduthu, process pannitu, response anupradhu)
- **JWT** enna? — login pannina apparam, oru "token" (id card madiri) client ku kudukurom.
  Adha vachu, aprom vara ella request-layum "naan yaaru" nu prove pannalam (middleware/authMiddleware.js paaru)

---

## 🗓️ DAY 2 — Frontend Setup + Connect to Backend

### Step 1: Frontend install
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Browser la `http://localhost:3000` automatic ah open aagum. Ippo unga Home page products
(seed pannina 3 products) kaatanum — idhu backend API la irundhu Redux vazhiyaa data fetch pannitu kaatura!

### Understand pannu (Day 2):
- **Redux Toolkit slice** enna? (store/slices/productSlice.js) — app la irukra "state" (data)
  ellam oru centralized place la vachu manage panradhu
- **createAsyncThunk** — API call pannitu, response va Redux store ku store pannradhuku use panrom
- **useSelector / useDispatch** — components la irundhu Redux store data va padikardhukum (`useSelector`),
  actions trigger pannradhukum (`useDispatch`)
- **localStorage** — cart items, login token browser refresh pannalum poidama irukka use pannirukom
- **React Router** — App.js la paaru, ella pages-um `<Route>` ah define pannirukom

### Test pannu ippo:
1. Register pannu oru puthu account (Register page)
2. Login pannu
3. Oru product open pannitu "Add to Cart" click pannu
4. Cart page la poi "Proceed to Checkout" click pannu (login pannirundha, shipping address page varum)
5. Shipping address fill pannitu "Place Order" click pannu → Order confirmation page varum!

Idhu vandha, unga **full flow** (Auth + Products + Cart + Order + JWT) ellam velaikuthu nu artham!

---

## 🗓️ DAY 3 — Customize + Polish + Deploy

### A. Unga theme/design customize pannradhu
- `frontend/src/App.css` open pannu — colors (`--famms-navy`, `--famms-amber`) maathi unga
  brand color podu
- Logo, product images maathu (`public/images/` folder create pannitu images podu,
  seeder.js la image paths update pannu)
- Home page hero banner text (`pages/Home.js`) maathi unga store name/tagline podu

### B. More features add pannalam (optional, unga time irundha):
- Product search bar (backend already supports `?keyword=` — Home.js la Form add pannunga)
- Product reviews UI (backend already has `createProductReview` — frontend form kudukanum)
- Admin: edit product form, order management page
- Razorpay / Stripe payment integration (COD ku badhula real payment)
- Image upload (Cloudinary / Multer)

### C. Deploy pannuradhu:

**Backend (Render.com free ah use pannalam):**
1. GitHub la unga backend code push pannu
2. Render.com la "New Web Service" create pannu, GitHub repo connect pannu
3. Environment variables la MONGO_URI, JWT_SECRET add pannu
4. Build command: `npm install`, Start command: `npm start`

**Frontend (Vercel — unga reference site kuda idhula dhaan host aagirukku):**
1. GitHub la unga frontend code push pannu
2. https://vercel.com -> New Project -> repo import pannu
3. Environment variable la `REACT_APP_API_URL` = unga Render backend URL + `/api`
4. Deploy click pannu — done!

**MongoDB Atlas** already cloud la irukku, so adha edhuvum extra pannanum nu illa.

---

## 🔑 Key Concepts Summary (Interview/Exam ku useful)

| Concept | Enga irukku | Yenna Panradhu |
|---|---|---|
| JWT Auth | middleware/authMiddleware.js | Login pannina apparam token verify pannradhu |
| Password Hashing | models/User.js (bcrypt) | Password plain text ah save pannama, hash pannitu save pannradhu |
| Redux Toolkit | store/slices/*.js | Global state management (cart, auth, products) |
| Protected Routes | components/PrivateRoute.js | Login pannama checkout page ku poga mudiyadhu |
| REST API | backend/routes/*.js | GET/POST/PUT/DELETE using proper URL patterns |
| MongoDB Atlas | config/db.js | Cloud-hosted NoSQL database |

---

## 🐛 Common Errors + Fix

- **"MongoNetworkError"** → Atlas Network Access la IP whitelist pannala. 0.0.0.0/0 add pannu.
- **CORS error frontend la** → backend `server.js` la `cors()` already added, but backend run
  aagudha nu check pannu.
- **"Invalid Token" / 401 errors** → `.env` la JWT_SECRET frontend-backend rendu kaadaiyum same ah
  irukanum nu illa (backend mattum secret, frontend ku theva illa), but login pannina apparam
  refresh pannitu try pannu.
- **Products kaatala Home page la** → seeder run pannirukingala nu check pannu (`npm run seed`
  backend folder la).

---

Idhu solid, production-pattern follow panna **starter code**. Idha base ah vachu, nee edhu venaalum
(features, design, payment) add pannikonde poganum. Doubt vandha kekunga, step by step
explain pannuren! 💪
