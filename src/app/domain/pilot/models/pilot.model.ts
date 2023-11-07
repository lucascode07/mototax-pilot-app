export interface Pilot {
  name: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cellphone: string;
  available: boolean;
  birthday: string;
  password: string;
  profilePhoto: Photo | File;
  driverLicense: DriverLicense;
  vehicles: Vehicles;
}

export interface DriverLicense {
  data: DriverLicenseData;
}

export interface DriverLicenseData {
  id: number;
  attributes: DriverLicenseAttributes;
}

export interface DriverLicenseAttributes {
  licenseNumber: string;
  expirationDate: string;
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
  licensePlate: string;
  year: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
