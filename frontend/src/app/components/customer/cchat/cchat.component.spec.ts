import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CchatComponent } from './cchat.component';

describe('CchatComponent', () => {
  let component: CchatComponent;
  let fixture: ComponentFixture<CchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
