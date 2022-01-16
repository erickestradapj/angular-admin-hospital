import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

  printUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.printUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchesService.search('users', term).subscribe((results) => {
      this.users = results;
    });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      Swal.fire('Error', 'cant not delete itself ', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Will delete the user ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {
          this.printUsers();

          Swal.fire(
            'User deleted',
            `${user.name} was be deleted successfully`,
            'success'
          );
        });
      }
    });
  }
}
