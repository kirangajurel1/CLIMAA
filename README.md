<h1 align="center"> CLIMAA </h1>

<p align="center"> 
  A comprehensive, high-performance climate monitoring and air quality intelligence platform built for the modern web.
</p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>

---
## 🚀 Live Demo
Try the application here:

https://climaa-liart.vercel.app/

### 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CLIMAA** is a sophisticated, real-time meteorological dashboard designed to provide users with hyper-local weather data and atmospheric health metrics through a seamless, interactive user interface.

> In an era of increasing environmental volatility, accessing accurate and immediate atmospheric data is no longer a luxury but a necessity. Many existing solutions are either cluttered with intrusive advertisements or provide generic data that lacks local precision. CLIMAA solves this by delivering a streamlined, component-based dashboard that aggregates complex weather patterns and air quality indices into actionable, easy-to-read visual insights.

By leveraging **React 19** and **Vite 7**, CLIMAA ensures near-instantaneous data rendering and state management, allowing users to monitor shifting weather conditions and pollution levels with zero latency. The architecture is built on a modular foundation, separating data logic into dedicated helper functions and context providers to ensure scalability and maintainability.

### Architecture Highlights:
- **Component-Based Design**: Modular UI elements like `WeatherCard` and `Sidebar` for reusability.
- **Global State Management**: Utilizing React Context (`WeatherContext`, `SettingsContext`) to synchronize data across disparate dashboard views.
- **Service-Oriented Logic**: Centralized API interaction within `WeatherApi.js` to decouple data fetching from UI rendering.

---

## ✨ Key Features

CLIMAA is engineered with the user's need for clarity and speed in mind. Each feature is designed to transform raw meteorological data into intuitive visual components.

*   📊 **Real-Time Dashboard Overview**: Instantly view the current state of the atmosphere. The main dashboard aggregates temperature, humidity, and atmospheric pressure into a single, high-cohesion view.
*   🍃 **Advanced Air Quality Monitoring**: Dedicated atmospheric health tracking. Using specialized logic in `AQIHelperFunctions.js`, the platform translates complex pollutant concentrations into standardized health advisories.
*   📅 **Extended Daily Forecasts**: Plan ahead with confidence. The `Daily.jsx` engine processes upcoming weather trends to provide a granular look at the week ahead.
*   ⚙️ **Personalized User Settings**: Tailor the experience to your needs. Whether you require Metric or Imperial units, the `SettingsContext.js` ensures your preferences persist across the entire application session.
*   📱 **Responsive & Performant UI**: Built with **Tailwind CSS 4**, the interface is optimized for every screen size, from mobile devices to high-resolution desktop monitors, without sacrificing loading speed.
*   🛡️ **Robust Error Handling**: The `erroeMessage.js` utility ensures that even when external data sources are unavailable, the user is provided with clear, non-technical feedback rather than a broken interface.

---

## 🛠️ Tech Stack & Architecture

CLIMAA utilizes a cutting-edge frontend stack to ensure maximum performance and developer productivity.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **React 19** | UI Library | Chosen for the latest concurrent rendering capabilities and improved hook performance. |
| **Vite 7** | Build Tool | Provides lightning-fast Hot Module Replacement (HMR) and optimized production builds. |
| **Tailwind CSS 4** | Styling | Offers a utility-first approach that reduces CSS bundle size and accelerates UI development. |
| **React Router 7** | Navigation | Enables sophisticated client-side routing between the Dashboard, Air Quality, and Settings pages. |
| **Context API** | State Management | Provides a lightweight, built-in solution for global state without the overhead of external libraries. |

---

## 📁 Project Structure

The project follows a highly organized directory structure designed for modularity and ease of navigation.

```text
kirangajurel1-CLIMAA-8195e1e/
├── 📁 public/                 # Static assets and global icons
│   ├── 📄 vite.svg            # Vite branding asset
│   └── 📁 images/             # Application-specific imagery
│       └── 📄 logo.png        # CLIMAA brand identity
├── 📁 src/                    # Core application source code
│   ├── 📁 assets/             # Internal static assets
│   │   └── 📄 react.svg       # React branding asset
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📄 WeatherCard.jsx # Dynamic weather display component
│   │   ├── 📁 Footer/         # Application footer module
│   │   │   └── 📄 Footer.jsx
│   │   ├── 📁 Header/         # Application header module
│   │   │   └── 📄 Header.jsx
│   │   ├── 📁 HelperFunctions/ # Business logic & data processing
│   │   │   ├── 📄 AQIHelperFunctions.js    # Air Quality logic
│   │   │   └── 📄 WeatherHelperFunctions.js # Weather data formatting
│   │   └── 📁 sidebar/        # Primary navigation module
│   │       └── 📄 Sidebar.jsx
│   ├── 📁 context/            # Global state providers
│   │   ├── 📄 SettingsContext.jsx        # User preference state
│   │   ├── 📄 WeatherContext.jsx         # Global weather state
│   │   └── 📄 WeatherContextProvider.jsx # Context wrapper
│   ├── 📁 envImport/          # Configuration management
│   │   └── 📄 conf.js         # Environment variable mapping
│   ├── 📁 pages/              # Top-level route components
│   │   ├── 📄 AirQuality.jsx  # Atmospheric health view
│   │   ├── 📄 Daily.jsx       # Forecast view
│   │   ├── 📄 Dashboard.jsx   # Primary data overview
│   │   └── 📄 Settings.jsx    # Application configuration
│   ├── 📁 services/           # External API integrations
│   │   └── 📄 WeatherApi.js   # Meteorological data fetching
│   ├── 📁 utils/              # General purpose utilities
│   │   └── 📄 erroeMessage.js # Standardized error reporting
│   ├── 📄 App.css             # Main application styles
│   ├── 📄 App.jsx             # Root component & routing logic
│   ├── 📄 index.css           # Global Tailwind directives
│   └── 📄 main.jsx            # Application entry point
├── 📄 eslint.config.js        # Linting and code quality rules
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies and script definitions
├── 📄 tailwind.config.js      # Tailwind CSS customization
└── 📄 vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

Follow these steps to set up the CLIMAA development environment on your local machine.

### Prerequisites
- **Node.js**: Version 18.x or higher is recommended.
- **npm**: Version 9.x or higher.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/kirangajurel1/CLIMAA.git
    cd kirangajurel1-CLIMAA-8195e1e
    ```

2.  **Install Dependencies**
    Execute the following command to install the required React 19 and Tailwind 4 packages:
    ```bash
    npm install
    ```

3.  **Run Development Server**
    Start the Vite development environment:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

4.  **Building for Production**
    To generate an optimized production build:
    ```bash
    npm run build
    ```

---

## 🔧 Usage

CLIMAA is designed to be intuitive and requires minimal configuration for basic operation.

### Navigation
Upon launching the application, you can navigate between different modules using the `Sidebar` component:
- **Dashboard**: Your primary hub for current weather conditions.
- **Air Quality**: Specialized metrics regarding PM2.5, PM10, and other atmospheric pollutants.
- **Daily**: A chronological list of upcoming weather forecasts.
- **Settings**: Configuration panel for toggling units and display preferences.

### Data Flow
1.  The `WeatherApi.js` service fetches raw data from meteorological endpoints.
2.  `WeatherHelperFunctions.js` and `AQIHelperFunctions.js` sanitize and format this data.
3.  The formatted data is injected into the `WeatherContextProvider`.
4.  UI components like `WeatherCard.jsx` consume this context to display real-time updates.

### Configuration
Environment configurations are managed through `src/envImport/conf.js`. This file acts as a gatekeeper for any external API keys or configuration strings required by the `WeatherApi.js` service.

---

## 🤝 Contributing

We welcome contributions to improve CLIMAA! Whether you are fixing a bug, improving the UI, or adding new features, your input is valuable.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page.
2. **Create a feature branch** 
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** - Improve code, documentation, or features.
4. **Test thoroughly** - Ensure all functionality works as expected.
   ```bash
   npm run lint
   ```
5. **Commit your changes** - Write clear, descriptive commit messages.
   ```bash
   git commit -m 'Add: Implementation of UV Index tracking in WeatherCard'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review.

### Development Guidelines

- ✅ **Style Consistency**: Follow the existing code style and naming conventions.
- 📝 **Documentation**: Update the README or add inline comments for complex logic in `HelperFunctions`.
- 🧪 **Performant Code**: Ensure that new components do not cause unnecessary re-renders in the `WeatherContextProvider`.
- 🎯 **Atomic Commits**: Keep your commits focused on a single logical change.

### Ideas for Contributions
- 🐛 **Bug Fixes**: Resolve any edge cases in the AQI calculation logic.
- 🎨 **UI/UX**: Enhance the `Sidebar` transitions or `WeatherCard` animations.
- ⚡ **Performance**: Optimize the rendering of the `Daily` forecast list for mobile devices.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:

- ✅ **Commercial use:** You can use this project commercially.
- ✅ **Modification:** You can modify the code to suit your specific needs.
- ✅ **Distribution:** You can distribute this software freely.
- ✅ **Private use:** You can use this project privately.
- ⚠️ **Liability:** The software is provided "as is", without warranty of any kind.
- ⚠️ **Trademark:** This license does not grant trademark rights to the CLIMAA brand.

---

<p align="center">Made with ❤️ for a better-informed world.</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>