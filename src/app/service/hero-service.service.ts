import { Injectable } from '@angular/core';
import { Hero, Necromancer, Witch, Knight, Dragon } from './hero';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  heroesToFight: Hero[] = [];


  herolist: any[] = [
    {
      id: 1,
      img: 'assets/witch.jpg',
      name: 'Witch',
      hp: 80,
      type: 'Witch',
      lvl: 1,
      damage: 15,
      nrOfWins: 0,
      nrOfLosses: 0
    },
    {
      id: 2,
      img: 'assets/necromancer.jpg',
      name: 'Necromancer',
      hp: 80,
      type: 'Necromancer',
      lvl: 1,
      damage: 15,
      nrOfWins: 0,
      nrOfLosses: 0
    },
    {
      id: 3,
      img: 'assets/knight.jpg',
      name: 'Knight',
      hp: 80,
      type: 'Knight',
      lvl: 1,
      damage: 15,
      nrOfWins: 0,
      nrOfLosses: 0
    },
    {
      id: 4,
      img: 'assets/dragon.jpg',
      name: 'Dragon',
      hp: 80,
      type: 'Dragon',
      lvl: 1,
      damage: 15,
      nrOfWins: 0,
      nrOfLosses: 0
    }
  ];

  private heroesToFightSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private heroesListSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<any[]>(this.herolist);

  private heroesUrl = 'http://localhost:3000/heroes';

  constructor() {

  }

  updateHeroesToFight(data: any) {
    this.heroesToFight = data;
  }

  getHeroesToFight() {
    return this.heroesToFight;
  }

  getHeroes() {
    return this.herolist;
  }

  getHeroesToFightObservable(): Observable<Hero[]> {
    return this.heroesToFightSubject.asObservable();
  }

  getHeroesListObservable(): Observable<Hero[]> {
    return this.heroesListSubject.asObservable();
  }



  addHero(newHero: any) {

    let checkDuplicate = true;

    this.herolist.forEach(element => {

      if (element.name === newHero.name) {
        checkDuplicate = false;
        
      }

    });

    if (checkDuplicate) {
      let newHeroImg = newHero.type.toLowerCase();
      newHero.img = 'assets/' + newHeroImg + '.jpg';
      this.herolist.push(newHero);
    }

    return checkDuplicate;

  }

  deleteHero(index:number) {
    this.herolist.splice(index,1);
  }


  levelUpHero(hero1: Hero, hero2: Hero) {

    this.heroesToFight.forEach(element => {

      if (element.name === hero1.name) {
        if (element.nrOfWins === 2) {
          element.lvl++;
          element.nrOfWins = 0;
          element.nrOfLosses = 0;
          element.hp += 30;
          element.damage += 5;
        } else {
          element.nrOfWins++;
        }
      }

      if (element.name === hero2.name) {
        if (element.nrOfLosses === 4) {
          element.lvl++;
          element.nrOfLosses = 0;
          element.nrOfWins = 0;
          element.hp += 30;
          element.damage += 5;
        } else {
          element.nrOfLosses++;
        }
      }

    });

    console.log(this.herolist);
    this.updateHeroList(this.herolist);

  }

  updateHeroList(data: any) {
    console.log('Updated heroes list:', data);
  }


}
