export interface RegisterResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: PilotAttributes;
}

export interface PilotAttributes {
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
}

export interface Meta {}
