export interface DriverLicenseResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  numeroLicencia: string;
  fechaVencimiento: string;
}

export interface Meta {}
