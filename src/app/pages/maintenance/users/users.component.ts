import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this.printUsers();
  }

  public printUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  public changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.printUsers();
  }

  public search(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchesService.search('users', term).subscribe((results) => {
      this.users = results;
    });
  }
}
