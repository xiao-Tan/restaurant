import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllreviewComponent } from './allreview.component';

describe('AllreviewComponent', () => {
  let component: AllreviewComponent;
  let fixture: ComponentFixture<AllreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
