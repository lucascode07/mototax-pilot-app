export interface VehiclesResponse {
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
  placa: string;
  anioFabricacion: string;
}

export interface Meta {}
