# Smart Tourism Safety System

A comprehensive safety application for tourists featuring real-time geolocation, geo-fencing alerts, and nearby emergency services.

## Features

- 🗺️ **Interactive Maps**: Real-time location tracking with Leaflet maps
- 🚨 **SOS Emergency Button**: Quick access to emergency services
- 🏥 **Nearby Safety Points**: Hospitals, police stations, and fire departments
- 🛡️ **Geo-fencing**: Safe zone monitoring and alerts
- 📱 **Responsive Design**: Optimized for mobile and desktop
- ⚡ **Real-time Updates**: Live location tracking and distance calculations

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Maps**: Leaflet with React-Leaflet
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Safety Features

- **Emergency Contacts**: Direct calling to emergency services
- **Location Accuracy**: GPS accuracy display
- **Safe Zones**: Predefined safe areas with alerts
- **Distance Calculation**: Real-time distance to safety points
- **Navigation**: Direct navigation to safety points

## Browser Support

Requires geolocation API support. Works best on modern browsers with GPS capabilities.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for detailste

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
