import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public imgTemp: any = '';
  public imageToUpload: File | null | undefined;

  constructor(public modalImageService:ModalImagenService,
              public fileUploadService:FileUploadService         
              ) { }

  closeModal(){
    this.imageToUpload=null
    this.imgTemp =''
    this.modalImageService.cerrarModal();  
  }

  ngOnInit(): void {
  }
  changeImage(event: EventTarget) {
    this.imageToUpload = (event as HTMLInputElement).files![0];

    if (!this.imageToUpload) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }
  updateImage() {
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;
    this.fileUploadService
      .updatePhoto(this.imageToUpload!, tipo, id!)
      .then((img) => {
        Swal.fire({
          title: '👤',
          text: 'Imagen de usuario actualizada',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.closeModal()
        this.modalImageService.newImage.emit(img)
      }, err=>{
        console.log(err)

      });
  }
}
