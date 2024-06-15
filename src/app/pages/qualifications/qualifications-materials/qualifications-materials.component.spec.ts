import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsMaterialsComponent } from './qualifications-materials.component';

describe('QualificationsMaterialsComponent', () => {
  let component: QualificationsMaterialsComponent;
  let fixture: ComponentFixture<QualificationsMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
