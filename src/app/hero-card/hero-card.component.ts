import { Component, OnInit } from '@angular/core';
import { HeroServiceService } from '../service/hero-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataTransferService } from '../service/data-transfer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  showFightLog = true;


  receivedData: any = '';


  constructor(private heroService: HeroServiceService, private dataTransferService: DataTransferService) {
    // this.dataTransferService.getData().subscribe((data) => {
    //   this.receivedData = data;
    // });
  }

  ngOnInit(): void {
    this.dataTransferService.getLogObservable().subscribe(data => {
      this.receivedData = data;
      console.log('Received data:', data);
    });
}


  heroList = this.heroService.getHeroes();
  items: typeof this.heroList = [];

  handleButtonClicked() {
    console.log(this.receivedData);

  }

  dropHero(event: CdkDragDrop<typeof this.heroList>) {
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
      this.heroService.updateHeroesToFight(this.items);
    }
  }

  formatFightLog(log: string): string {
    return log.replace(/\n/g, '<br>');
  }

}
