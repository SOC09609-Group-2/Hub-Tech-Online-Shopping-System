import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleReportComponent } from './product-sale-report.component';

describe('ProductSaleReportComponent', () => {
  let component: ProductSaleReportComponent;
  let fixture: ComponentFixture<ProductSaleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSaleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
