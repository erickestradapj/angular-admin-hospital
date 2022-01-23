import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public doctors: Doctor[] = [];
  private imgSubs!: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.printDoctors();

    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.printDoctors());
  }

  printDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.loading = false;
      this.doctors = doctors;
      console.log(doctors);
    });
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id!, doctor.img);
  }

  search(term: string) {
    if (term.length === 0) {
      this.printDoctors();
    }

    this.searchesService.search('doctors', term).subscribe((results) => {
      this.doctors = results as Doctor[];
    });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Will delete the user ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id!).subscribe((resp) => {
          this.printDoctors();

          Swal.fire(
            'User deleted',
            `${doctor.name} was be deleted successfully`,
            'success'
          );
        });
      }
    });
  }
}
