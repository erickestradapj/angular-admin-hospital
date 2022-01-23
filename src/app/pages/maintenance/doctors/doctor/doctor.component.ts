import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals!: Hospital[];
  public hospitalSelected!: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['Hernando', Validators.required],
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
    console.log(this.doctorForm.value);
  }
}
