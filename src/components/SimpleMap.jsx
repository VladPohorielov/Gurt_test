import { useState } from "react";
import data from "../data/locations.json";

export default function SimpleMap({ className = "" }) {
  const [selectedLocation, setSelectedLocation] = useState(data[0]);
  const [isMapLoading, setIsMapLoading] = useState(false);

  const handleLocationChange = (location) => {
    if (location.id !== selectedLocation?.id) {
      setIsMapLoading(true);
      setSelectedLocation(location);
      // Симулюємо завантаження карти
      setTimeout(() => setIsMapLoading(false), 800);
    }
  };

  const openInGoogleMaps = (location) => {
    // Використовуємо координати якщо є, інакше адресу
    const url = location.lat && location.lng 
      ? `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ', Одеса, Україна')}`;
    window.open(url, '_blank');
  };

  const getMapEmbedUrl = (location) => {
    if (location.lat && location.lng) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.123456789!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${location.lat.toFixed(6).replace('.', '%C2%B0')}%22N+${location.lng.toFixed(6).replace('.', '%C2%B0')}%22E!5e0!3m2!1sen!2sua!4v1696000000000!5m2!1sen!2sua&q=${encodeURIComponent(location.address)}`;
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${encodeURIComponent(location.address + ', Одеса, Україна')}`;
  };

  return (
    <div className={`grid md:grid-cols-[320px_1fr] gap-4 ${className}`}>
      {/* Список адрес */}
      <aside className="glass p-4 max-md:order-2">
        <h3 className="text-lg font-semibold text-white mb-2">Наші адреси</h3>
        <ul className="space-y-2">
          {data.map(location => (
            <li 
              key={location.id}
              className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedLocation?.id === location.id 
                  ? "border-brand-yellow bg-brand-yellow/10 shadow-lg scale-[1.02]" 
                  : "border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
              onClick={() => handleLocationChange(location)}
            >
              <div className="text-white font-medium">{location.title}</div>
              <div className="text-white/70 text-sm mt-1">{location.address}</div>
              <div className="flex justify-between items-center mt-2">
                <a 
                  className="text-brand-yellow text-sm hover:text-brand-yellow/80 transition-colors" 
                  href={`tel:${location.phone}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {location.phone}
                </a>
                {selectedLocation?.id === location.id && (
                  <span className="text-brand-yellow text-xs">👈 Обрано</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Інтерактивна мапа та інформація */}
      <div className="space-y-4">
        {/* Заголовок обраної локації */}
        <div className="glass p-4">
          <h3 className="text-xl font-semibold text-white mb-1">
            {selectedLocation?.title}
          </h3>
          <p className="text-white/80 text-sm mb-3">
            {selectedLocation?.address}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href={`tel:${selectedLocation?.phone}`}
              className="inline-flex items-center justify-center px-4 py-2 bg-brand-yellow text-brand-black font-medium rounded-lg hover:bg-brand-yellow/90 transition-colors text-sm"
            >
              📞 Подзвонити
            </a>
            <button
              onClick={() => openInGoogleMaps(selectedLocation)}
              className="inline-flex items-center justify-center px-4 py-2 border border-brand-yellow text-brand-yellow font-medium rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-colors text-sm"
            >
              🗺️ Прокласти маршрут
            </button>
          </div>
        </div>

        {/* Вбудована мапа Google */}
        <div className="glass p-1 rounded-2xl overflow-hidden">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-gray-900">
            {/* Індикатор завантаження */}
            {isMapLoading && (
              <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-yellow border-t-transparent"></div>
                  <div className="text-white text-sm">Завантажую мапу...</div>
                </div>
              </div>
            )}
            <iframe
              key={selectedLocation?.id} // Перезавантажуємо iframe при зміні локації
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${encodeURIComponent((selectedLocation?.address || '') + ', Одеса, Україна')}&zoom=15&maptype=roadmap`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl transition-opacity duration-300"
              title={`Мапа: ${selectedLocation?.title}`}
            />
            
            {/* Overlay з назвою локації */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
              📍 {selectedLocation?.title?.split('—')[1]?.trim() || selectedLocation?.title}
            </div>
            
            {/* Кнопка повноекранного режиму */}
            <button
              onClick={() => openInGoogleMaps(selectedLocation)}
              className="absolute top-3 right-3 bg-brand-yellow text-brand-black p-2 rounded-lg hover:bg-brand-yellow/90 transition-colors"
              title="Відкрити в Google Maps"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Додаткова інформація */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass p-4 text-center">
            <div className="text-2xl mb-2">🌻</div>
            <div className="text-white text-sm font-medium">Квіти по оптовим цінам</div>
          </div>
          <div className="glass p-4 text-center">
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-white text-sm font-medium">Доставка по Одесі</div>
          </div>
          <div className="glass p-4 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-white text-sm font-medium">8:00 - 20:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}