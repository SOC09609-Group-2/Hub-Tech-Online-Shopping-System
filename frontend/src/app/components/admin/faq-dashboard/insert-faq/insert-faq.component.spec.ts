import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFaqComponent } from './insert-faq.component';

describe('InsertFaqComponent', () => {
  let component: InsertFaqComponent;
  let fixture: ComponentFixture<InsertFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
