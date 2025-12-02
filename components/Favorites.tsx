import React, { useState } from 'react';
import { MOCK_LOCATIONS, generateMockWeather } from '../constants';
import { CloudSun, Trash2, Plus, X, Check } from 'lucide-react';

interface FavoritesProps {
    onSelect: (location: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onSelect }) => {
    const [locations, setLocations] = useState<string[]>(MOCK_LOCATIONS);
    const [isAdding, setIsAdding] = useState(false);
    const [newCity, setNewCity] = useState('');

    const handleAddLocation = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (newCity.trim()) {
            setLocations([...locations, newCity.trim()]);
            setNewCity('');
            setIsAdding(false);
        }
    };

    const handleRemoveLocation = (e: React.MouseEvent, loc: string) => {
        e.stopPropagation();
        setLocations(locations.filter(l => l !== loc));
    };

    // Generate weather data for current list of locations
    const favorites = locations.map(loc => generateMockWeather(loc));

    return (
        <div className="flex flex-col h-full pt-6 pb-24 px-4 z-10 overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold text-primary mb-6 px-2">Saved Locations</h2>
            <div className="grid grid-cols-1 gap-4">
                {favorites.map((weather, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onSelect(weather.location)}
                        className="relative overflow-hidden card-glass p-6 rounded-3xl cursor-pointer group hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                    >
                         <button 
                             onClick={(e) => handleRemoveLocation(e, weather.location)}
                             className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95 z-20"
                         >
                             <Trash2 size={18} className="text-red-500 dark:text-red-300 hover:text-red-600 dark:hover:text-red-100" />
                         </button>
                         <div className="flex justify-between items-center">
                             <div>
                                 <h3 className="text-xl font-bold text-primary">{weather.location.split(',')[0]}</h3>
                                 <p className="text-sm text-secondary">{weather.condition}</p>
                             </div>
                             <div className="flex items-center space-x-2">
                                <CloudSun className="text-secondary" />
                                <span className="text-3xl font-light text-primary">{weather.currentTemp}°</span>
                             </div>
                         </div>
                         <div className="mt-4 flex justify-between text-xs text-secondary">
                             <span>H: {weather.high}° L: {weather.low}°</span>
                             <span>Precip: {weather.hourly[0].precipChance}%</span>
                         </div>
                    </div>
                ))}
            </div>

            {isAdding ? (
                <form onSubmit={handleAddLocation} className="mt-6 w-full p-2 card-glass rounded-3xl flex items-center space-x-2">
                    <input
                        autoFocus
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="Enter city name..."
                        className="flex-1 bg-transparent text-primary placeholder-slate-400 dark:placeholder-white/40 px-4 py-2 focus:outline-none"
                    />
                    <button 
                        type="submit"
                        className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-300 transition-colors"
                    >
                        <Check size={20} />
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setIsAdding(false); setNewCity(''); }}
                        className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </form>
            ) : (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="mt-6 w-full py-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20 text-secondary hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/40 hover:text-primary transition-all flex items-center justify-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Add New Location</span>
                </button>
            )}
        </div>
    );
};

export default Favorites;