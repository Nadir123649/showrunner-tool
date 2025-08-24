# Abyss – Frontend Developer Assignment (React + Vite)

This is a complete, working React + Vite project that fulfills the requirements:

- Parse a sample script and detect 3+ characters (mock logic)
- Display detected characters in a grid
- Drag & drop characters into a **Scene Zone**
- Integrate **Replicate API** (Flux dev) to generate images
- Show **captions** below each image
- **Notifications** when character added
- Bonus: **localStorage** persistence, **TailwindCSS** styling

## 🧰 Stack
- React 18 + Vite
- TailwindCSS
- @dnd-kit/core for drag & drop
- Axios
- react-toastify

## 🚀 Getting Started
```bash
npm install
npm run dev
```
App runs at http://localhost:5173

## 🔑 Environment
Create `.env` (or copy `.env.example`) and set:
```
VITE_REPLICATE_API_KEY=r8_esf3CzzywrHDvfDrZRu203FiaQ2kvdR0nMXrq
```

## 🖼️ Replicate Notes
This project calls Replicate from the browser. If you see CORS errors in your environment, you can set up a simple proxy or enable the Vite dev proxy in `vite.config.js`.

## 📁 Structure
```
src/
  components/
  hooks/
  utils/
```

## ✅ Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview the build

## 📝 License
For assignment/demo use.
# showrunner-tool
