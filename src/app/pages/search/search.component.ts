import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => this.searchGlobal(term));
  }

  searchGlobal(term: string) {
    this.searchesService.searchGlobal(term).subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
      this.hospitals = resp.hospitals;
      this.doctors = resp.doctors;
    });
  }

  openDoctor(doctor: Doctor) {
    console.log('hey!!');
  }
}
