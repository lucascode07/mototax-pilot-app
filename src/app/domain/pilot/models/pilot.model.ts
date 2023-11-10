export interface Pilot {
  nombres: string;
  apellidos: string;
  correo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  celular: string;
  habilitado: boolean;
  fechaNacimiento: string;
  password: string;
  fotoPerfil: Photo | File;
  licencia: DriverLicense;
  vehiculos: Vehicles;
}

export interface DriverLicense {
  data: DriverLicenseData;
}

export interface DriverLicenseData {
  id: number;
  attributes: DriverLicenseAttributes;
}

export interface DriverLicenseAttributes {
  numeroLicencia: string;
  fechaVencimiento: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Photo {
  data: ProfilePhotoData;
}

export interface ProfilePhotoData {
  id: number;
  attributes: ProfilePhotoAttributes;
}

export interface ProfilePhotoAttributes {
  name: string;
  alternativeText: string;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Large;
  small: Large;
  medium: Large;
  large: Large;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Vehicles {
  data: VehiclesDatum[];
}

export interface VehiclesDatum {
  id: number;
  attributes: VehiclesAttributes;
}

export interface VehiclesAttributes {
  placa: string;
  anioFabricacion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
