import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAddComponent } from './hero-add.component';

describe('HeroAddComponent', () => {
  let component: HeroAddComponent;
  let fixture: ComponentFixture<HeroAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroAddComponent]
    });
    fixture = TestBed.createComponent(HeroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
