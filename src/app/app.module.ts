import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr'; //

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroAddComponent } from './hero-add/hero-add.component';
import { OrientationDirective } from './orientation.directive';
import { LoadingAnimationComponent } from './animation/loading-animation/loading-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroCardComponent,
    HeroAddComponent,
    OrientationDirective,
    LoadingAnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ToastrModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
