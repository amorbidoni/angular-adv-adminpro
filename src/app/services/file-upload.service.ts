import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePhoto(
    file: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const _url = `${baseUrl}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);
      const response = await fetch(_url, {
        method: 'PUT',
        headers: { 'x-token': localStorage.getItem('token') || '' },
        body: formData,
      });
      const data = await response.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error', error);
      return false;
    }
  }
}
