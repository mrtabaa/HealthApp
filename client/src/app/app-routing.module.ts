import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupLabComponent } from './components/signup-lab/signup-lab.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup-lab', component: SignupLabComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'no-access', component: NoAccessComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
