import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private baseUrl = environment.base_url;

  private _hiddenModal: boolean = true;
  public type!: 'users' | 'doctors' | 'hospitals';
  public id: string = '';
  public img: string = '';

  public newImage: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public get hiddenModal() {
    return this._hiddenModal;
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-img'
  ) {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    this.img = img;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this.baseUrl}/uploads/${type}/${img}`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }
}
