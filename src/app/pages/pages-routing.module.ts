/* ===== ANGULAR ===== */
import { Routes, RouterModule } from '@angular/router';

/* ===== MODULES ===== */
import { NgModule } from '@angular/core';

/* ===== COMPONENTS ===== */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar' },
      },
      {
        path: 'graph1',
        component: Graph1Component,
        data: { title: 'Graph #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'RxJS' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'User profile' },
      },
      {
        path: 'search/:term',
        component: SearchComponent,
        data: { title: 'searches' },
      },

      // Maintenance
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: {
          title: 'hospital Maintenance',
        },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: {
          title: 'doctor Maintenance',
        },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: {
          title: 'doctor Maintenance',
        },
      },

      // Admin routes
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent,
        data: {
          title: 'User Maintenance',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
