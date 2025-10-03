import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import data from "../data/locations.json";
import { useMemo, useState } from "react";

// Створюємо кастомну іконку для маркерів
const yellowPin = L.divIcon({
  className: "custom-pin",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.27 21.73 0 14 0Z" fill="#FFD400" stroke="#111" stroke-width="1.5"/>
    <circle cx="14" cy="14" r="5" fill="#111"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -36]
});

// Компонент для анімації переміщення мапи
function FlyTo({ center }) {
  const map = useMap();
  
  useMemo(() => { 
    if (center && center.length === 2) {
      map.flyTo(center, 15, { duration: 0.6 }); 
    }
  }, [center, map]);
  
  return null;
}

export default function MapOdessa({ className = "" }) {
  const validLocations = data.filter(location => location.lat && location.lng);
  const [focusCenter, setFocusCenter] = useState(
    validLocations[0] ? [validLocations[0].lat, validLocations[0].lng] : [46.482, 30.723]
  );

  const handleLocationClick = (location) => {
    setFocusCenter([location.lat, location.lng]);
  };

  return (
    <div className={`grid md:grid-cols-[320px_1fr] gap-4 ${className}`}>
      {/* Список адрес */}
      <aside className="glass p-4 max-md:order-2">
        <h3 className="text-lg font-semibold text-white mb-2">Наші адреси</h3>
        <ul className="space-y-2">
          {validLocations.map(location => (
            <li 
              key={location.id}
              className="p-3 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-colors focus:outline-brand-yellow/60 focus:outline focus:outline-2"
              onClick={() => handleLocationClick(location)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLocationClick(location);
                }
              }}
            >
              <div className="text-white font-medium">{location.title}</div>
              <div className="text-white/70 text-sm mt-1">{location.address}</div>
              <a 
                className="text-brand-yellow text-sm hover:text-brand-yellow/80 transition-colors focus:outline-brand-yellow/60" 
                href={`tel:${location.phone}`}
                onClick={(e) => e.stopPropagation()}
              >
                {location.phone}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Контейнер мапи */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10">
        <MapContainer 
          center={focusCenter} 
          zoom={13} 
          scrollWheelZoom
          className="h-[420px] md:h-[520px] w-full focus:outline-brand-yellow/60"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <FlyTo center={focusCenter} />
          
          {validLocations.map(location => (
            <Marker 
              key={location.id} 
              position={[location.lat, location.lng]} 
              icon={yellowPin}
            >
              <Popup>
                <div className="space-y-2 text-black">
                  <div className="font-semibold text-base">{location.title}</div>
                  <div className="text-sm">{location.address}</div>
                  {location.altAddress && (
                    <div className="text-xs text-gray-600">{location.altAddress}</div>
                  )}
                  <a 
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors" 
                    href={`tel:${location.phone}`}
                  >
                    {location.phone}
                  </a>
                  <a 
                    className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors focus:outline-blue-600/60"
                    target="_blank" 
                    rel="noreferrer"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                  >
                    Прокласти маршрут
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}