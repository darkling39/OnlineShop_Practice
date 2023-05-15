import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'house',
    loadChildren: () =>
      import('./components/house/house.module').then((m) => m.HouseModule),
    data: { breadcrumb: { alias: 'Home' } },
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'house', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
