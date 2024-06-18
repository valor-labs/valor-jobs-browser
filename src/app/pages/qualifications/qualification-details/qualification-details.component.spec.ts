import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationDetailsComponent } from './qualification-details.component';

describe('QualificationDetailsComponent', () => {
  let component: QualificationDetailsComponent;
  let fixture: ComponentFixture<QualificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
