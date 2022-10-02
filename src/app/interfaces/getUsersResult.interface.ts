import { Usuario } from '../models/user.model';
export interface UsersResult {
  ok: boolean;
  total: number;
  usuarios: Usuario[];
}
