# 🌦️ Minimalist Weather App

A sleek, responsive weather dashboard built with **React** and **Tailwind CSS**. 

This application allows users to search for any city globally and retrieves real-time weather data by chaining multiple APIs (Geocoding + Weather Forecasting) without requiring an API key.

🔗 **[Live Demo] (https://weather-app-seven-eosin-79.vercel.app/)**

![App Screenshot](screenshot.png)
<img width="1869" height="892" alt="image" src="https://github.com/user-attachments/assets/fee6b8e9-f411-4098-883b-70b5ba4c9208" />

## 🚀 Key Features

* **Real-Time Data:** Fetches current temperature, wind speed, and weather conditions.
* **Smart Search:** Accepts city names, converts them to geographic coordinates, and then fetches weather data.
* **Dynamic UI:** Background and icons change based on the weather state (e.g., ☀️ for clear sky, 🌧️ for rain).
* **Robust Error Handling:** graceful error messages for invalid cities or network issues.
* **Responsive Design:** Fully mobile-optimized using Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS (Glassmorphism & Dark Mode aesthetics)
* **API:** [Open-Meteo](https://open-meteo.com/) (Free, No Key required)
* **Deployment:** Vercel

## 🧠 Technical Highlights (How it Works)

The core challenge of this project was handling the asynchronous data flow. Since the weather API requires latitude/longitude but users search by "City Name," I implemented a **chained API request**:

1.  **Geocoding Step:** The app first hits the Geocoding API to resolve the city name (e.g., "London") into coordinates (`51.50`, `-0.12`).
2.  **Weather Fetching Step:** Once the coordinates are resolved, a second `await` call fetches the specific weather data for that location.
3.  **State Management:** I used `useState` to manage the complex transition states: `loading` (spinner), `error` (bad input), and `success` (data display).

## 💻 Getting Started

To run this project locally:

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/weather-app.git](https://github.com/YOUR_USERNAME/weather-app.git)
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run the server**
    ```bash
    npm run dev
    ```

## 🔮 Future Improvements
* Add a 7-day forecast using list mapping.
* Implement a "Use My Location" button using the browser's Geolocation API.
* Dark/Light mode toggle.
