import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user!: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search(term: string) {
    if (term.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }
}
