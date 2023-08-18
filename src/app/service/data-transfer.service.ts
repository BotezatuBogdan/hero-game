import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

    fightLog = '';

    private fightLogSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setLog(txt: string) {
      const updatedLog = this.fightLogSubject.getValue() + '<div>' + txt + '</div>';
      // const updatedLog = '<div>' + txt + '</div> \n ' + this.fightLogSubject.getValue();
      this.fightLogSubject.next(updatedLog);
    }

    getLogObservable() {
      return this.fightLogSubject.asObservable();
    }

    resetLog() {
      this.fightLogSubject.next('');
    }

    updateFightText(txt: string) {
       this.fightLog = this.fightLog +'\n' + '<p>' + txt + '<p>';
      //  this.fightLog = '<p>' + txt + '<p>' + '<br>' +  this.fightLog ;
    }


}
