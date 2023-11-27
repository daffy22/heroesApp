import { Component } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent {

  heroes!: Hero[];
  heroesFiltered!: Hero[];
  action: string = 'filter';

  heroForm: FormGroup = this.fb.group({
    id: [],
    name: [],
    power: []
  });

  constructor(private fb: FormBuilder, private heroService: HeroService,
              private snackBar: MatSnackBar) {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.heroesFiltered = this.heroes.filter(hero => hero.power > 100);
      });
  }

  changeAction(action: string) {
    this.action = action;
  }

  createHero() {
    const newHero: Hero = {
      id: this.heroForm.get('id')?.value,
      name: this.heroForm.get('name')?.value,
      power: this.heroForm.get('power')?.value,
    }

    try {
      this.heroes = [ ...this.heroes, newHero ];
      this.heroesFiltered = this.heroes.filter(hero => hero.power > 100);
      this.heroForm.reset();
      this.snackBar.open('Superhero created: ' + newHero.name.toUpperCase(), 'OK');
    } catch (e) {
      console.log(e);
      this.snackBar.open('An error has occurred', 'Exit');
    }
  }
}
