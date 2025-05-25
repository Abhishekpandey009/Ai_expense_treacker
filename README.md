# 💸 AI Expense Tracker

A modern, multilingual expense tracker built with React, Vite, and TypeScript.  
Supports English, Hindi, and Russian. Analyze your spending, get AI-powered insights, and manage your finances with ease.

---

## 👨‍💻 Author

**Abhishekpandey009**

---

## 🔗 Live URLs

- [https://ai-expense-treacker.onrender.com](https://ai-expense-treacker.onrender.com)

---


## 🚀 Overview

This application allows users to:
- Securely log in and track income and expenses.
- Automatically categorize transactions using an AI model.
- Get monthly financial summaries and tips.
- Optionally use voice to log expenses.
- Forecast future expenses using ML (optional).

---

## 🚀 Features

- Add, edit, and delete expenses
- Multi-language support (English, Hindi, Russian)
- Analytics dashboard with charts
- AI-generated spending insights
- Responsive design (mobile & desktop)
- Settings page for language and currency selection

---

## 🛠️ Tech Stack

- **React** — Frontend UI library
- **Vite** — Fast build tool and development server
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **i18next & react-i18next** — Internationalization (multi-language support)
- **React Router** — Client-side routing
- **Lucide React** — Icon library

---

## 📁 Project Structure

```
expense_treacker/
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   tailwind.config.js
│   tsconfig.app.json
│   tsconfig.json
│   tsconfig.node.json
│   vite.config.ts
│
├── .AP/                # Tool/build cache (optional)
├── node_modules/         # Installed dependencies
└── src/                  # Application source code
    ├── assets/           # Static assets (images, etc.)
    ├── components/       # Reusable UI components
    │   ├── analytics/
    │   ├── layout/
    │   ├── settings/
    │   └── ui/
    ├── context/          # React context providers
    ├── i18n/             # Internationalization setup
    │   ├── index.ts
    │   └── locales/
    │       ├── en.json
    │       ├── hi.json
    │       └── ru.json
    ├── pages/            # Top-level route components
    │   ├── AddExpense.tsx
    │   ├── Analytics.tsx
    │   ├── Dashboard.tsx
    │   ├── EditExpense.tsx
    │   ├── Insights.tsx
    │   └── Settings.tsx
    ├── utils/            # Utility/helper functions
    │   └── currencies.ts
    ├── App.tsx           # Main app component
    └── main.tsx          # Entry point
```

---


## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhishekpandey009/Ai_expense_treacker.git
   cd Ai_expense_treacker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

This project is ready for static hosting (e.g., Render, Netlify, Vercel).

- **Build for production:**
  ```bash
  npm run build
  ```
- **Publish the `dist` directory.**

---

## 📝 Customization

- **Add more languages:**  
  Edit files in `src/i18n/locales/`.
- **Change categories or currencies:**  
  Edit `src/utils/currencies.ts` and related files.

---

## 📄 License

MIT

---

## 🙏 Credits

- [Lucide Icons](https://lucide.dev/)
- [i18next](https://www.i18next.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

For questions or feedback, open an issue or contact [Abhishekpandey009](https://github.com/Abhishekpandey009).
