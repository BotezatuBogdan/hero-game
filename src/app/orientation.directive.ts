import { Compiler, ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Renderer2, ViewContainerRef } from '@angular/core';
import { LoadingAnimationComponent } from './animation/loading-animation/loading-animation.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Directive({
  selector: '[appOrientation]'
})
export class OrientationDirective {

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkOrientation();
  }

  ngOnInit(): void {
    this.checkOrientation();
  }

  checkOrientation(): void {
    if (window.innerWidth < 400) { // Example threshold for mobile layout
      
        console.log('Portrait mode detected. It would be recommend to use landscape mode, but portrait works too');
         alert('Portrait mode detected. It would be recommend to use landscape mode, but portrait works too')
      
    }
  }

  
}
