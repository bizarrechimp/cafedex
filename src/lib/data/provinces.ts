export type Province = {
  code: string; // machine-friendly code (lowercase, no accents)
  name: string; // display name (Spanish, may include accents)
  active: boolean; // whether this province should be selectable in the MVP
};

// A complete, maintainable list of provinces (and autonomous cities).
// Keep `active: true` only for provinces that should be selectable in the MVP
export const PROVINCES: Province[] = [
  { code: 'a-coruna', name: 'A Coruña', active: false },
  { code: 'alava', name: 'Álava', active: false },
  { code: 'albacete', name: 'Albacete', active: false },
  { code: 'alicante', name: 'Alicante', active: true },
  { code: 'almeria', name: 'Almería', active: false },
  { code: 'asturias', name: 'Asturias', active: false },
  { code: 'avila', name: 'Ávila', active: false },
  { code: 'badajoz', name: 'Badajoz', active: false },
  { code: 'barcelona', name: 'Barcelona', active: false },
  { code: 'burgos', name: 'Burgos', active: false },
  { code: 'caceres', name: 'Cáceres', active: false },
  { code: 'cadiz', name: 'Cádiz', active: false },
  { code: 'cantabria', name: 'Cantabria', active: false },
  { code: 'castellon', name: 'Castellón', active: false },
  { code: 'ceuta', name: 'Ceuta', active: false },
  { code: 'ciudad-real', name: 'Ciudad Real', active: false },
  { code: 'cordoba', name: 'Córdoba', active: false },
  { code: 'cuenca', name: 'Cuenca', active: false },
  { code: 'girona', name: 'Girona', active: false },
  { code: 'granada', name: 'Granada', active: false },
  { code: 'guadalajara', name: 'Guadalajara', active: false },
  { code: 'guipuzcoa', name: 'Guipúzcoa', active: false },
  { code: 'huelva', name: 'Huelva', active: false },
  { code: 'huesca', name: 'Huesca', active: false },
  { code: 'jaen', name: 'Jaén', active: false },
  { code: 'la-rioja', name: 'La Rioja', active: false },
  { code: 'las-palmas', name: 'Las Palmas', active: false },
  { code: 'leon', name: 'León', active: false },
  { code: 'lleida', name: 'Lleida', active: false },
  { code: 'lugo', name: 'Lugo', active: false },
  { code: 'madrid', name: 'Madrid', active: false },
  { code: 'malaga', name: 'Málaga', active: false },
  { code: 'murcia', name: 'Murcia', active: false },
  { code: 'navarra', name: 'Navarra', active: false },
  { code: 'ourense', name: 'Ourense', active: false },
  { code: 'palencia', name: 'Palencia', active: false },
  { code: 'pontevedra', name: 'Pontevedra', active: false },
  { code: 'salamanca', name: 'Salamanca', active: false },
  { code: 'santa-cruz-de-tenerife', name: 'Santa Cruz de Tenerife', active: false },
  { code: 'segovia', name: 'Segovia', active: false },
  { code: 'sevilla', name: 'Sevilla', active: false },
  { code: 'soria', name: 'Soria', active: false },
  { code: 'tarragona', name: 'Tarragona', active: false },
  { code: 'teruel', name: 'Teruel', active: false },
  { code: 'toledo', name: 'Toledo', active: false },
  { code: 'valencia', name: 'Valencia', active: false },
  { code: 'valladolid', name: 'Valladolid', active: false },
  { code: 'vizcaya', name: 'Vizcaya', active: false },
  { code: 'zamora', name: 'Zamora', active: false },
  { code: 'zaragoza', name: 'Zaragoza', active: false },
  { code: 'melilla', name: 'Melilla', active: false }
];

export const getActiveProvinces = () => PROVINCES.filter(p => p.active);

export const isActiveProvince = (value?: string) => {
  if (!value) return false;
  const norm = value.trim().toLowerCase();
  return PROVINCES.some(p => p.active && p.name.toLowerCase() === norm);
};
