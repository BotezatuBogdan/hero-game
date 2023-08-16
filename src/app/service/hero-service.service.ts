import { Injectable } from '@angular/core';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  heroesToFight = [];

  herolist = [
    {
      img: '/assets/witch.jpg',
      name: 'Witch',
      type: 'Witch',
      damage: 15,
      lvl: 1,
      hp: 80,
      nrOfWins: 0
    },
    {
      img: '/assets/necromancer.jpg',
      name: 'Necromancer',
      type: 'Necromancer',
      damage: 15,
      lvl: 1,
      hp: 80,
      nrOfWins: 0
    },
    {
      img: '/assets/knight.jpg',
      name: 'Knight',
      type: 'Knight',
      damage: 15,
      lvl: 1,
      hp: 80,
      nrOfWins: 0
    },
    {
      img: '/assets/dragon.jpg',
      name: 'Dragon',
      type: 'Dragon',
      damage: 15,
      lvl: 1,
      hp: 80,
      nrOfWins: 0
    }
  ];

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

  addHero(data: { img: string; name: string; hp: number; }) {

  }

  levelUpHero(hero: Hero) {

    this.herolist.forEach(item => {
      if (item.name === hero.name) {
        if (item.nrOfWins < 5) {
          item.nrOfWins += 1;
        } else {
          item.nrOfWins = 0;
          item.lvl += 1;
          item.hp = item.hp + (item.hp * item.lvl / 2);
          item.damage = item.damage + (item.damage * item.lvl / 2);
        }
      }

    });

    console.log(this.herolist);
    
  }


}
