import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

    fightLog = '';

    private fightLogSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setLog(txt: string) {
      const updatedLog = this.fightLogSubject.getValue() + '\n' + txt + '\n';
      this.fightLogSubject.next(updatedLog);
    }

    getLogObservable() {
      return this.fightLogSubject.asObservable();
    }

    resetLog() {
      this.fightLogSubject.next('');
    }


}
