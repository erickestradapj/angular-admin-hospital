import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(
    img: string | undefined,
    type: 'users' | 'doctors' | 'hospitals'
  ): string {
    if (!img) {
      return `${base_url}/uploads/${type}/no-image`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/uploads/${type}/${img}`;
    } else {
      return `${base_url}/uploads/${type}/no-image`;
    }
  }
}
