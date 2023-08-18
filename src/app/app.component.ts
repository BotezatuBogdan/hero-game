import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeroAddComponent } from './hero-add/hero-add.component';
import { Fight, Knight, Witch, Hero, Dragon, Necromancer } from './service/hero';
import { HeroServiceService } from './service/hero-service.service';
import { FightService } from './service/fight.service';
import { DataTransferService } from './service/data-transfer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HeroFight';

  constructor(private dialogRef: MatDialog, private heroServ: HeroServiceService, private fighService: FightService, private dataTransferService: DataTransferService) { }

  addHero() {
    this.dialogRef.open(HeroAddComponent);

  }

  @Output() buttonClicked = new EventEmitter<void>();

  fight() {

    const opponents: { img: string; name: string; hp: number; damage: number; type?: string; lvl: number }[] = this.heroServ.getHeroesToFight();

    if (opponents.length > 0) {

      // Create an array to store the created hero instances
      let heroInstances = [];

      // Iterate over the opponents and create instances based on their class names
      for (let opponent of opponents) {
        if (opponent.type) {
          let heroInstance: Hero | null = null;

          switch (opponent.type) {
            case 'Witch':
              heroInstance = new Witch(opponent.name, opponent.hp, opponent.damage, opponent.lvl, this.dataTransferService);
              break;
            case 'Knight':
              heroInstance = new Knight(opponent.name, opponent.hp, opponent.damage, opponent.lvl, this.dataTransferService);
              break;
            case 'Dragon':
              heroInstance = new Dragon(opponent.name, opponent.hp, opponent.damage, opponent.lvl, this.dataTransferService);
              break;
            case 'Necromancer':
              heroInstance = new Necromancer(opponent.name, opponent.hp, opponent.damage, opponent.lvl, this.dataTransferService);
              break;
            // Add other hero classes and their cases here
          }

          if (heroInstance) {
            heroInstances.push(heroInstance);
          }
        }
      }

      const epicfight = new Fight(heroInstances[0], heroInstances[1], this.dataTransferService, this.heroServ)


      epicfight.go()

    } else {
      alert('Place two opponents to start the fight');
    }

  }


}
