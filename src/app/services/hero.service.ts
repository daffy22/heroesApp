import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) {
  }

  getHeroes() {
    return this.http.get<Hero[]>('assets/heroes.json')
      .pipe(
        map((response: any) => response.heroes)
      );
  }
}
