export interface RegisterResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: PilotAttributes;
}

export interface PilotAttributes {
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
}

export interface Meta {}
