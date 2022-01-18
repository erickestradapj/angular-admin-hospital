import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.printHospitals();

    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.printHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  printHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe((resp) => {
      this.printHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Enter new hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    });

    if (value?.trim().length! > 0) {
      this.hospitalService.createHospital(value!).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      });
    }

    console.log(value);
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id!, hospital.img);
  }
}
