import { Component } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  heroForm: FormGroup = this.fb.group({
    id: [],
    name: [],
    power: []
  });

  heroes!: Hero[];

  action: string = 'list';

  heroesFiltered!: Hero[];

  constructor(private fb: FormBuilder, private heroService: HeroService) {
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
    const hero: Hero = {
      id: this.heroForm.get('id')?.value,
      name: this.heroForm.get('name')?.value,
      power: this.heroForm.get('power')?.value,
    }

    this.heroes.push(hero);
    this.heroes = [...this.heroes];
    this.heroesFiltered = this.heroes.filter(hero => hero.power > 100);
    this.heroForm.reset();
  }
}
