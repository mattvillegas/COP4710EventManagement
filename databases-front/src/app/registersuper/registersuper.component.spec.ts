import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersuperComponent } from './registersuper.component';

describe('RegistersuperComponent', () => {
  let component: RegistersuperComponent;
  let fixture: ComponentFixture<RegistersuperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersuperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
