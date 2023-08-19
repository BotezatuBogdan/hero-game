import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeroServiceService } from '../service/hero-service.service';
import { Witch, Knight, Dragon, Necromancer } from '../service/hero';
import { DataTransferService } from '../service/data-transfer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})
export class HeroAddComponent {

    constructor(private dialogRef: MatDialogRef<HeroAddComponent>, private heroService: HeroServiceService, private dataTransferService: DataTransferService) {}


  name: string = 'Knight';
  selectedType: string = 'Knight'

  showError = false; 

  heroTypes = [
    {value: 'Knight'},
    {value: 'Witch'},
    {value: 'Dragon'},
    {value: 'Necromancer'}
  ];

  createHero() {
    
    let heroInstance = null;

    switch (this.selectedType) {
      case 'Witch':
        heroInstance = new Witch(this.name, 80, 15, 1, this.dataTransferService);
        break;
      case 'Knight':
        heroInstance = new Knight(this.name, 80, 15, 1, this.dataTransferService);
        break;
      case 'Dragon':
        heroInstance = new Dragon(this.name, 80, 15, 1, this.dataTransferService);
        break;
      case 'Necromancer':
        heroInstance = new Necromancer(this.name, 80, 15, 1, this.dataTransferService);
        break;
      // Add other hero classes and their cases here
    }

    let err = this.heroService.addHero(heroInstance);

    if(err) {
      this.dialogRef.close()
    } else {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000); // Hide the error message after 3 seconds
      
    }

    
  }

  closeDialog() {
    this.dialogRef.close()
  }



}


