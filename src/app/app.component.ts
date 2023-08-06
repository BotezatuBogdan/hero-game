import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { HeroAddComponent } from './hero-add/hero-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HeroFight';

  constructor( private dialogRef: MatDialog) {}

  addHero() {
    this.dialogRef.open(HeroAddComponent);
  }

}
