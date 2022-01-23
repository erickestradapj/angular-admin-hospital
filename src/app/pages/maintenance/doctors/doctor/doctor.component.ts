import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals!: Hospital[];
  public hospitalSelected!: Hospital;
  public doctorSelected!: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.printHospitals();

    this.doctorForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSelected = this.hospitals.find((h) => h._id === hospitalId)!;
    });
  }

  printHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    this.doctorService
      .createDoctor(this.doctorForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Created', `${name} created successfully`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
      });
  }
}
