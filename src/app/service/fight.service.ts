import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  fightlog: string = '';

  

  emitButtonClick() {

  }

  updateFightText(txt: string) {
    this.fightlog = this.fightlog +'\n' + txt;
  }

}
