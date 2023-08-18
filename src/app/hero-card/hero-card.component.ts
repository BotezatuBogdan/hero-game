import { Component, OnInit } from '@angular/core';
import { HeroServiceService } from '../service/hero-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataTransferService } from '../service/data-transfer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../service/hero';


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  showFightLog = true;
  receivedData: any = '';
  heroList = this.heroService.getHeroes();
  items: typeof this.heroList = [];

  constructor(private heroService: HeroServiceService, private dataTransferService: DataTransferService) {
    // this.dataTransferService.getData().subscribe((data) => {
    //   this.receivedData = data;
    // });
  }


  heroesList$!: Observable<Hero[]>;
  

  ngOnInit(): void {
    this.heroesList$ = this.heroService.getHeroesListObservable();

    this.heroesList$.subscribe(data => {
      console.log('Updated heroes list:', data);
      this.heroList = data;
    });

    this.dataTransferService.getLogObservable().subscribe(data => {
      this.receivedData = data;
    });
  }


  deleteHero(index: number) {
    this.heroService.deleteHero(index);
  }


  dropHero(event: CdkDragDrop<any, any, any>) {
    // this.items.push(this.heroList[0])
    if (event.previousContainer === event.container) {
      // Handle reordering within the hero container if needed
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.dataTransferService.resetLog();
    }
  }

  dropItem(event: CdkDragDrop<typeof this.heroList>) {
    if (event.previousContainer === event.container) {
      // Handle reordering within the item container if needed
    } else {
      if (event.container.data.length < 2) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      this.dataTransferService.resetLog();
      this.heroService.updateHeroesToFight(this.items);
    }
  }

  formatFightLog(log: string): string {
     return log.replace(/\n/g, '<br>');
  }

}
