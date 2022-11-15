import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { CustomPipe } from './custom.pipe';



@NgModule({
  declarations: [ImagenPipe, CustomPipe],
  imports: [],
  exports:[ImagenPipe, CustomPipe]
})
export class PipesModule { }
