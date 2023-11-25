import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: '**', // comodin: cualquier otra ruta, me redirecciona a lo que este en 'redirecTo'
    redirectTo: 'heroes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
