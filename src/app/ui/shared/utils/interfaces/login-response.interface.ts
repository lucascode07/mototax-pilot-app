import { Pilot } from '../../../../domain/pilot/models/pilot.model';

export interface LoginResponse {
  data: LoginResponseData[];
  meta: Meta;
}

export interface LoginResponseData {
  id: number;
  attributes: Pilot;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
