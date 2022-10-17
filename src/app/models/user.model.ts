import { environment } from '../../environments/environment.prod';
const baseUrl = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE'
  ) {}

  get imageUrl() {
    if (!this.img) {
      return `${baseUrl}/uploads/usuarios/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${baseUrl}/uploads/usuarios/${this.img}`;
    } else {
      return `${baseUrl}/uploads/usuarios/no-image`;
    }
  }
}
