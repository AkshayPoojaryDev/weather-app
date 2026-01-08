import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading  , setLoading] = useState(false);

 const getWeatherIcon = (code) => {
  if (code === 0) return "☀️"; // Clear sky
    if (code >= 1 && code <= 3) return "🌤️"; // Partly cloudy
    if (code >= 45 && code <= 48) return "🌫️"; // Fog
    if (code >= 51 && code <= 67) return "🌧️"; // Rain
    if (code >= 71 && code <= 77) return "❄️"; // Snow
    if (code >= 95 && code <= 99) return "⛈️"; // Thunderstorm
    return "🌡️";
 }
  const fetchWeather = async () => {
    setError(null);
    setWeatherData(null);
    setLoading(true);

    try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      // 1. Geocoding API
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("Location not found.");
        setLoading(false);
        return; 
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Weather API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      setWeatherData({
        city: name,
        country: country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
      });

      setCity(""); 
    } catch (err) {
      setError("Network error. Please try again.");
    }finally{
        setLoading(false);
    }
  };

  return (
    // MAIN BACKGROUND: Dark Slate (Solid, professional color)
  <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-slate-100 p-4 font-sans">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8 text-white tracking-tight">Weather Forecast</h1>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Search city..."
            className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500 transition border border-transparent"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            disabled={loading} // Disable input while loading
          />
          <button
            onClick={fetchWeather}
            disabled={loading} // Disable button while loading
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            {loading ? "..." : "Search"} 
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 border border-red-500/20 text-sm">
            {error}
          </div>
        )}

        {/* LOADING SPINNER */}
        {loading && (
          <div className="animate-pulse text-amber-500 text-xl font-bold my-10">
            Finding location...
          </div>
        )}

        {weatherData && !loading && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl text-slate-400 font-medium">
              {weatherData.city}, {weatherData.country}
            </h2>
            
            {/* NEW: Display the Emoji Icon */}
            <div className="text-6xl my-4">
              {getWeatherIcon(weatherData.weathercode)}
            </div>

            <div className="text-8xl font-bold mb-6 text-white tracking-tighter">
              {Math.round(weatherData.temperature)}°
            </div>

            <div className="bg-slate-700/50 rounded-xl p-4 mt-6 inline-flex items-center gap-3 border border-slate-600">
              <span className="text-slate-300 font-medium">Wind Speed:</span>
              <span className="text-amber-400 font-bold">{weatherData.windspeed} km/h</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;