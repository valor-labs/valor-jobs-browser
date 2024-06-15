import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsDependencyComponent } from './qualifications-dependency.component';

describe('QualificationsDependencyComponent', () => {
  let component: QualificationsDependencyComponent;
  let fixture: ComponentFixture<QualificationsDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsDependencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
