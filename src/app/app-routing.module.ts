/* ===== ANGULAR===== */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* ===== MODULES ===== */
import { PageRoutingModule } from './pages/pages-routing.module';

/* ===== COMPONENTS ===== */
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [
  // path: '/dashboard' -> PageRoutingModule
  // path: '/auth' -> AuthRoutingModule
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PageRoutingModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
