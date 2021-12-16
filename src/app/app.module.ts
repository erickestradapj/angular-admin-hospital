/* ===== ANGULAR ===== */
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

/* ===== MODULES ===== */
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

/* ===== COMPONENTS ===== */
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

@NgModule({
  declarations: [AppComponent, NotPageFoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
