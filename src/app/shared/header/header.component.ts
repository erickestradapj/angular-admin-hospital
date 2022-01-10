import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }
}
