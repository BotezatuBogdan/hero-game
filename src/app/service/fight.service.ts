import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor() {}
  // private heroesUrl = 'http://localhost:3000/heroes'; // Update with your server URL

  // constructor(private http: HttpClient) {}

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl);
  // }

  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero);
  // }

  // updateHero(hero:Hero, index: any): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${index}`;
  //   return this.http.put<Hero>(url, hero);
  // }

  // deleteHero(id: number): Observable<any> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url);
  // }

  emitButtonClick() {

  }



}
