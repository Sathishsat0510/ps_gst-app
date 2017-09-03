import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprodutctsComponent } from './viewprodutcts.component';

describe('ViewprodutctsComponent', () => {
  let component: ViewprodutctsComponent;
  let fixture: ComponentFixture<ViewprodutctsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprodutctsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprodutctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
