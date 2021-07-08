import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprofileComponent } from './sprofile.component';

describe('SprofileComponent', () => {
  let component: SprofileComponent;
  let fixture: ComponentFixture<SprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
