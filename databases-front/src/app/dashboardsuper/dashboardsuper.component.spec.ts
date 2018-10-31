import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsuperComponent } from './dashboardsuper.component';

describe('DashboardsuperComponent', () => {
  let component: DashboardsuperComponent;
  let fixture: ComponentFixture<DashboardsuperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsuperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
