import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { MovieComponent } from './components/movie/movie.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'home', component: HomeComponent,
  ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'watchlist', component: WatchlistComponent,
  ...canActivate(() => redirectUnauthorizedTo(['/login'])) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
