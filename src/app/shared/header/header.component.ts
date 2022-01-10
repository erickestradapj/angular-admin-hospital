import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public image: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.image = this.userService.user.imageUrl;
  }

  logout() {
    this.userService.logout();
  }
}
