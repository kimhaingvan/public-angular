import { ResetPasswordComponent } from './pages/components/reset-password/reset-password.component';
import { LoginViewGuard } from './login.guard';
import { UserRegisterAccountComponent } from './pages/user/user-subpages/user-register-account/user-register-account.component';
import { LoginComponent } from './pages/admin/admin-subpages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './pages/user/user-subpages/user-login/user-login.component';
import { AdminPageGuard } from './auth-guard';


const routes: Routes = [
  { path: 'book-store',loadChildren: () => import('./pages/book-store/book-store.module').then(m => m.BookStoreModule)},
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin',canActivate:[AdminPageGuard],  loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
  { path: 'user',  loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  { path: 'user/register', canActivate:[LoginViewGuard], component: UserRegisterAccountComponent},
  { path: 'user/login',  canActivate:[LoginViewGuard],  component: UserLoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '', redirectTo: 'book-store',pathMatch: 'full'},
  { path: '**', redirectTo: 'book-store' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
