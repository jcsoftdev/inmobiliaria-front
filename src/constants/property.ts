export enum PropertyTypesEnum {
  apartment = 'Departamento',
  house = 'Casa',
  parking = 'Estacionamiento',
  land = 'Terreno',
  commercial = 'Comercial',
}

export enum PropertyAmenitiesEnum {
  furnished = 'Amueblado',
  parking = 'Estacionamiento',
  pool = 'Piscina',
  garden = 'Jardín',
  terrace = 'Terraza',
  security = 'Seguridad',
}

export const PROPERTIES_TYPES = Object.entries(PropertyTypesEnum).map(
  ([key, value]) => ({
    key,
    value,
  }),
)

export const PROPERTIES_AMENITIES = Object.entries(PropertyAmenitiesEnum).map(
  ([key, value]) => ({
    key,
    value,
  }),
)
