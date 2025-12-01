# Connectrix

An ISP management system built with React, Vite, and Tailwind CSS.

## Features

- Admin dashboard for managing clients, subscriptions, payments, and router configurations
- Client portal for viewing plans, usage, and payments
- Authentication system
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router (to be implemented)
- **API**: Axios for HTTP requests

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
connectrix/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── logo192.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   ├── admin/       # Admin-specific components
│   │   └── client/      # Client portal components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities & API
│   ├── contexts/        # React contexts
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── App.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Connectrix
VITE_APP_VERSION=1.0.0
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
