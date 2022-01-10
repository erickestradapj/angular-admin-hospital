import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public menuItems!: any[];
  public user!: User;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
    this.user = this.userService.user;
  }
}
